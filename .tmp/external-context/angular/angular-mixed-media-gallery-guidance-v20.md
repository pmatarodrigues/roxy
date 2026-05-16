---
source: Context7 API
library: Angular
package: angular
topic: mixed-media-gallery-standalone-components-union-types-a11y-performance-safe-iframes
fetched: 2026-05-14T14:20:00Z
official_docs: https://angular.dev
---

## Scope

Angular guidance for mixed media editorial cards (image + video embed), with standalone components, type-safe unions, accessibility, performance, and SafeResourceUrl handling.

## 1) Template patterns (standalone + conditional rendering)

- Prefer built-in control flow blocks: `@if`, `@switch`, `@for` for cleaner templates and better type narrowing.
- For union media rendering, use `@switch (item.type)` over nested `@if` chains.
- Use `@default never;` in template `@switch` for exhaustive checks on union discriminants.
- For heavy card internals (video players, rich overlays), wrap in `@defer` with viewport trigger.

```html
@for (item of items; track item.id) {
<article class="card">
  @switch (item.type) { @case ('image') {
  <figure>
    <img
      [ngSrc]="item.src"
      [width]="item.width"
      [height]="item.height"
      [alt]="item.alt"
      [attr.sizes]="item.sizes || null"
      loading="lazy"
      decoding="async"
    />
    @if (item.caption) {
    <figcaption>{{ item.caption }}</figcaption>
    }
  </figure>
  } @case ('video') { @defer (on viewport) {
  <figure>
    <iframe
      [src]="item.safeEmbedUrl"
      [title]="item.title"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    @if (item.caption) {
    <figcaption>{{ item.caption }}</figcaption>
    }
  </figure>
  } @placeholder {
  <div class="media-skeleton" aria-hidden="true"></div>
  } } @default never; }
</article>
}
```

## 2) Type-safe data model (union media types)

- Use discriminated unions (`type: 'image' | 'video'`) with shared base fields.
- Keep iframe URL trust result typed as `SafeResourceUrl` at model/view-model boundary.
- Avoid `any`; keep rendering data immutable (`readonly`).

```ts
import { SafeResourceUrl } from '@angular/platform-browser';

interface MediaBase {
  readonly id: string;
  readonly type: 'image' | 'video';
  readonly caption?: string;
}

export interface ImageMedia extends MediaBase {
  readonly type: 'image';
  readonly src: string;
  readonly alt: string; // required for a11y decision; may be '' if decorative
  readonly width: number;
  readonly height: number;
  readonly sizes?: string;
}

export interface VideoMedia extends MediaBase {
  readonly type: 'video';
  readonly title: string; // required for iframe accessibility
  readonly embedUrl: string; // raw, validated against allowlist
  readonly safeEmbedUrl: SafeResourceUrl; // sanitized/trusted output
}

export type MediaItem = ImageMedia | VideoMedia;
```

## 3) Accessibility for mixed media cards

- `iframe`: always provide meaningful `title` (not generic "video").
- `img`: always provide `alt`; use empty `alt=""` only for decorative images.
- Use semantic grouping: `<figure>` + `<figcaption>` for media + caption pairing.
- For dynamic ARIA values, bind via `[attr.aria-*]`.
- Ensure keyboard path to media controls; avoid hover-only interactions.

## 4) Performance for media-heavy sections

- Use `NgOptimizedImage` (`ngSrc`) with explicit `width`/`height` to prevent layout shift.
- Default non-critical images to lazy loading (`loading="lazy"`), async decode (`decoding="async"`).
- Mark only true hero/LCP image with `priority` (lets Angular set high fetch priority).
- Use responsive images via `sizes` + generated `srcset`.
- Use `@defer` for expensive video embeds/components so JS loads on demand.

## 5) Safe resource URL handling (iframe embeds)

- Treat `bypassSecurityTrustResourceUrl` as high-risk API; use only after strict validation/allowlist.
- Validate host/path first (e.g., only YouTube/Vimeo embed domains), then create `SafeResourceUrl`.
- Create trusted value close to input transformation boundary.
- Never pass arbitrary user-provided URLs directly into bypass methods.

```ts
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const ALLOWED_EMBED_ORIGINS = new Set(['https://www.youtube.com', 'https://player.vimeo.com']);

export function toSafeEmbedUrl(sanitizer: DomSanitizer, rawUrl: string): SafeResourceUrl {
  const u = new URL(rawUrl);
  if (!ALLOWED_EMBED_ORIGINS.has(u.origin)) {
    throw new Error('Untrusted embed origin');
  }
  return sanitizer.bypassSecurityTrustResourceUrl(u.toString());
}
```

## Source pages used

- https://angular.dev/guide/templates/control-flow (`@if`, `@switch`, exhaustive `@default never`)
- https://angular.dev/api/core/%40defer and https://angular.dev/best-practices/performance/defer (`@defer`)
- https://angular.dev/api/common/NgOptimizedImage and https://angular.dev/best-practices/performance/image-optimization
- https://angular.dev/best-practices/a11y
- https://angular.dev/api/platform-browser/DomSanitizer and https://angular.dev/best-practices/security
