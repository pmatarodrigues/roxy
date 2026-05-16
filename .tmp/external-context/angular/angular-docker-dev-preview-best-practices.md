---
source: Context7 API
library: Angular + Docker + Docker Compose + NGINX
package: angular
topic: dockerizing-angular-local-dev-and-static-preview
fetched: 2026-05-14T13:00:00Z
official_docs: https://docs.docker.com/guides/angular/containerize/
---

## 1) Multi-stage Dockerfile (Angular build -> nginx runtime)

```dockerfile
# syntax=docker/dockerfile:1
ARG NODE_VERSION=24.12.0-alpine
ARG NGINX_VERSION=alpine3.22

FROM node:${NODE_VERSION} AS builder
WORKDIR /app

# cache-friendly deps layer
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner
COPY nginx.conf /etc/nginx/nginx.conf

# Angular app builder output path pattern (v17+ application builder):
# /app/dist/<project>/browser
COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

USER nginx
EXPOSE 8080
```

Why this pattern:

- small runtime image (no Node in final)
- non-root nginx runtime
- reproducible dependency install with `npm ci`

## 2) Local dev container pattern (ng serve + mounts)

```dockerfile
# Dockerfile.dev
ARG NODE_VERSION=24.12.0-alpine
FROM node:${NODE_VERSION}

ENV NODE_ENV=development
WORKDIR /app

COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm install

COPY . .
EXPOSE 4200

# host 0.0.0.0 required for host-browser access
CMD ["npm", "start", "--", "--host=0.0.0.0"]
```

Compose mount pattern (avoid host node_modules override):

```yaml
services:
  angular-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - '4200:4200'
    volumes:
      - .:/app
      - /app/node_modules
    command: npm start -- --host=0.0.0.0 --poll=2000
```

Caveat:

- On Docker Desktop/macOS/Windows, file-watch can miss events. Add `--poll`.

## 3) docker-compose setup with dev/preview profiles

```yaml
name: angular-app

services:
  dev:
    profiles: ['dev']
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - '4200:4200'
    volumes:
      - .:/app
      - /app/node_modules
    command: npm start -- --host=0.0.0.0 --poll=2000

  preview:
    profiles: ['preview']
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '8080:8080'
```

Run:

- `docker compose --profile dev up --build`
- `docker compose --profile preview up --build`

## 4) .dockerignore recommendations

```dockerignore
# deps/build output
node_modules
dist
out-tsc
.angular
.cache
.tmp

# tests/artifacts
coverage
cypress
playwright-report
reports

# env/logs
*.env*
!*.env.production
*.log
*.tsbuildinfo

# vcs/editor/os
.git
.gitignore
.vscode
.idea
.DS_Store
Thumbs.db

# local orchestration files (optional)
docker-compose*.yml
```

Key rule:

- keep build context small; prevent accidental secret/env copy.

## 5) Angular dist output caveat (`dist/<project>/browser`)

For modern Angular application builder, static browser artifacts land under:

- `dist/<project>/browser`

Impact:

- nginx copy step must target `/browser` subdir.
- generic `COPY /app/dist /usr/share/nginx/html` can serve wrong folder for some builds.

If custom `outputPath` in `angular.json`, align Docker copy with actual path.

## 6) nginx static container security/performance basics

Use SPA-safe + hardened config:

```nginx
worker_processes auto;
pid /tmp/nginx.pid;

events { worker_connections 1024; }

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  # temp paths writable for unprivileged runtime
  client_body_temp_path /tmp/client_temp;
  proxy_temp_path       /tmp/proxy_temp_path;
  fastcgi_temp_path     /tmp/fastcgi_temp;
  uwsgi_temp_path       /tmp/uwsgi_temp;
  scgi_temp_path        /tmp/scgi_temp;

  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  gzip on;
  gzip_vary on;

  server {
    listen 8080;
    root /usr/share/nginx/html;
    index index.html;

    location / {
      try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|png|jpg|jpeg|gif|svg|woff2?)$ {
      expires 1y;
      add_header Cache-Control "public, immutable";
      access_log off;
    }
  }
}
```

Core caveats:

- unprivileged nginx listens on 8080 (not 80)
- use non-root image/user
- SPA fallback required (`try_files ... /index.html`)
- immutable cache only for fingerprinted static assets
