---
source: Context7 API
library: Angular
package: angular
topic: static-portfolio-guidance-v20
fetched: 2026-05-14T00:00:00Z
official_docs: https://angular.dev
---

## Angular static portfolio guidance (version-aware, Angular v20+)

### 1) Scaffolding + standalone architecture
- Use standalone app bootstrap (`bootstrapApplication`) with standalone root component.
- Router setup via `provideRouter(routes, ...)` in bootstrap providers.
- Angular v20+: standalone is default for generated app (`ng new` has `standalone` default true).
- Keep components small, OnPush change detection, lazy-load route-level sections where useful.

Example bootstrap shape:

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
```

### 2) Routing for static hosting (hash vs path)
- **Path strategy (default)** (`PathLocationStrategy`): clean URLs (`/projects`), better SEO/share links.
- **Hash strategy** (`withHashLocation()` / `useHash: true`): URLs like `/#/projects`, no server rewrite needed.
- Static host implication:
  - Path strategy needs rewrite/fallback so unknown paths return `index.html`.
  - Hash strategy avoids deep-link 404 issues on hosts without rewrite control.

### 3) Build output config for static hosts
- `ng build` outputs to `dist/<project>/` (configurable via `outputPath`).
- Production config enabled by default for `ng build` (optimized output).
- For subpath deploys (ex: GitHub Pages project site), set proper `<base href>` (or build with `--base-href`).
- `deployUrl` guidance changed with application builder: prefer `<base href>`; `deployUrl` not supported there.
- Optional static prerender mode config: `outputMode: "static"` (when using static output workflows).

### 4) Styling strategy options
- Global app styles: workspace global stylesheet (tokens, reset, typography, CSS vars).
- Component styles: default encapsulated (`ViewEncapsulation.Emulated`) for local isolation.
- SCSS: use `--style=scss` at scaffold for variables/mixins/partials.
- CSS variables: good for theme tokens (light/dark, spacing, color) shared across global + components.
- Use `ViewEncapsulation.None` only when you intentionally need global cascade from a component.

### 5) Accessibility + semantic HTML (portfolio)
- Use semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and correct heading order.
- Add meaningful alt text for project images; decorative images get empty alt.
- Bind ARIA attributes only when semantics need help (`[attr.aria-*]`).
- Ensure keyboard navigation and visible focus states.
- Target WCAG AA color contrast and run AXE/Lighthouse checks.

### 6) Performance for static content-heavy pages
- Use `NgOptimizedImage` for images (LCP priority, lazy non-priority images, responsive support).
- Set explicit image `width`/`height` to reduce layout shift.
- Use `@defer` for below-the-fold/heavy widgets (testimonials carousels, media sections).
- Keep route/component chunks lean; lazy load feature routes/blocks.
- Compress media assets and avoid autoplay-heavy embeds above fold.

### 7) YouTube/Vimeo embeds safely
- `iframe[src]` is Resource URL security context.
- Prefer strict allowlist + ID validation; construct embed URL from trusted pattern.
- If needed, use `DomSanitizer.bypassSecurityTrustResourceUrl` only on trusted URLs.
- Keep bypass call close to value construction; never pass arbitrary user URL directly.

Example:

```ts
this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  `https://www.youtube.com/embed/${videoId}`
);
```

### 8) Command set (create/run/build)

```bash
# Create standalone Angular app with routing + SCSS
ng new portfolio --routing --style=scss --standalone

# Run local dev server
cd portfolio
ng serve

# Production build (optimized)
ng build

# Production build for subpath hosting (ex: GitHub Pages project repo)
ng build --base-href /<repo-name>/

# Optional hash-routing deployment style (configure in provideRouter)
# provideRouter(routes, withHashLocation())
```

## Static host caveats (Netlify / Vercel / GitHub Pages)
- **Netlify/Vercel**: path routing works if rewrite/fallback to `index.html` exists for SPA routes.
- **GitHub Pages**:
  - Often easiest with hash routing if you want zero rewrite config.
  - If using path routing, ensure correct base href and a 404 fallback strategy.
  - Angular ecosystem option: `angular-cli-ghpages` (`ng add angular-cli-ghpages`).
