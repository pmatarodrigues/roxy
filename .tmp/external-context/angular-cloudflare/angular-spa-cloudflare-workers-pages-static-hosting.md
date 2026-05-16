---
source: Context7 API
library: Cloudflare Workers + Cloudflare Pages + Angular
package: angular-cloudflare
topic: angular-spa-cloudflare-workers-pages-static-hosting
fetched: 2026-05-14T12:00:00Z
official_docs: https://developers.cloudflare.com/workers/static-assets/
---

## 1) SPA deep-link fallback to `index.html`

- Workers Static Assets: set `assets.not_found_handling = "single-page-application"`.
- Result: unknown non-asset routes fall back to root `index.html` (SPA router handles path).

```toml
[assets]
directory = "./dist/<project>/browser"
not_found_handling = "single-page-application"
```

## 2) Routing config options

### Workers-level fallback (recommended for Workers Static Assets)

- Use Wrangler `assets.not_found_handling`.
- Optional: `run_worker_first` to let Worker handle selected routes before static asset fetch.

```toml
[assets]
directory = "./dist/<project>/browser"
binding = "ASSETS"
not_found_handling = "single-page-application"
# Example: Worker first for all paths except hashed/static bundle area
run_worker_first = ["/*", "!/assets/*"]
```

### Pages `_redirects` / `_headers`

- Pages supports `_redirects` and `_headers` files in publish dir.
- SPA fallback pattern commonly uses:

```txt
/*    /index.html   200
```

- Use `_headers` to tune cache policy per path/pattern.

## 3) Angular build artifact path + Wrangler patterns

- Angular CLI docs: `ng build` outputs under `dist/...`.
- With Angular application builder, default output commonly at `dist/<project>/browser`.
- Set Wrangler assets directory to produced browser folder.

```toml
[assets]
directory = "./dist/<project>/browser"
```

- If your project still outputs `dist/<project>/`, point directory there.
- `outputPath` in `angular.json` can customize location; keep Wrangler in sync.

## 4) Cache strategy (hashed assets vs HTML)

- Hashed JS/CSS assets: long cache (immutable) safe.
- `index.html`: short cache or no-cache so new deploy references new hashed filenames.
- In Pages, enforce via `_headers`; in Workers, set headers in Worker response path if needed.

Practical policy:

- `/assets/*` or `/*.hash.*`: `Cache-Control: public, max-age=31536000, immutable`
- `/index.html` and route fallbacks: `Cache-Control: no-cache`

## 5) Minimal `wrangler.toml` for static assets

```toml
name = "angular-spa"
main = "src/index.ts"
compatibility_date = "2026-05-14"

[assets]
directory = "./dist/<project>/browser"
not_found_handling = "single-page-application"
```

Notes:

- `main` required for Worker project.
- If pure static Pages flow, use Pages build/publish settings and `_redirects` fallback.

## 6) Caveats: path routing + 404 behavior

- SPA fallback can mask real 404s (all unknown paths return `index.html`/200).
- If you need true 404 page behavior for unknown app routes, handle inside Angular router or switch to 404-page strategy where appropriate.
- Missing top-level `index.html` in publish dir causes root/domain 404.
- Subpath deployments need correct Angular base href (`--base-href` or config), else asset URL breakages.

## Source snippets used

- Cloudflare Workers static assets docs: `assets.not_found_handling = "single-page-application"` and `directory` config.
- Cloudflare Workers examples: SPA shell + `run_worker_first` usage.
- Cloudflare Pages docs: route behavior, 404, and static deploy expectations.
- Angular docs: `ng build` output under `dist/`, app builder output commonly `dist/<project>/browser`, configurable `outputPath`.
