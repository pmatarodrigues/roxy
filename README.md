# Roxy Portfolio

Angular static portfolio for science communication roles.

## Features

- Recruiter-friendly single-page portfolio structure
- EN-first content with PT-original video support
- Video gallery with language/topic/search filters
- Cloudflare static deployment configuration

## Local run (Docker, no local Node required)

### Development mode (hot reload)

```bash
docker compose --profile dev up --build
```

Open: `http://localhost:4200`

### Production preview (static build + nginx)

```bash
docker compose --profile preview up --build
```

Open: `http://localhost:8080`

## Local run (Node installed)

```bash
npm install
npm start
```

## Build and test

```bash
npm run build -- --configuration production
npm run test -- --watch=false
```

## Deployment

Cloudflare static deployment details: `docs/deployment/cloudflare-static.md`

## Notes

- Development container uses polling (`--poll=2000`) for reliable file watching on Docker Desktop.
- Replace placeholder CV file before publishing.
