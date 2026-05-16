# Cloudflare Static Deployment (Angular SPA)

## Why this setup

Portfolio uses Angular path-based routing. Cloudflare must return `index.html` for deep links so Angular router resolves routes client-side.

## Build output

Run production build:

```bash
npm run build
```

Expected publish directory:

```text
dist/roxy-portfolio/browser
```

## Workers Static Assets config

`wrangler.toml`:

```toml
name = "marta-rocha-portfolio"
compatibility_date = "2026-05-14"

[assets]
directory = "./dist/roxy-portfolio/browser"
not_found_handling = "single-page-application"
```

### Behavior

- Existing files (JS/CSS/images) served directly
- Unknown routes fallback to `index.html`
- Angular handles route rendering in browser

## Pages-style fallback file

`public/_redirects` included:

```text
/* /index.html 200
```

Useful when deploying with Pages-compatible static publish flow.

## Cache guidance

- Hashed assets (`*.js`, `*.css`) can be long cached
- `index.html` should remain no-cache/short cache so new deploys reference latest hashed bundles

## Validation checklist

- [ ] `npm run build` succeeds
- [ ] Root URL loads correctly
- [ ] Deep link (e.g., `/videos`) resolves without 404
- [ ] Browser refresh on deep link does not 404
- [ ] Static asset URLs return 200

## Notes

- If deploy target changes to subpath hosting, set Angular base href accordingly.
- Replace placeholder CV file at `public/assets/marta-rocha-cv.pdf` with final PDF before go-live.
