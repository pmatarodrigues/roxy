# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.12.0-alpine
ARG NGINX_VERSION=alpine3.22

FROM node:${NODE_VERSION} AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build -- --configuration production

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=builder /app/dist/roxy-portfolio/browser /usr/share/nginx/html

USER nginx
EXPOSE 8080
