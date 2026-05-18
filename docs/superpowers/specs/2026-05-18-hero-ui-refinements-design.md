# Hero UI refinements — design spec

Date: 2026-05-18

## Scope

Four changes to the home page:

1. Hero button colors (primary + secondary)
2. "Sugestão do Mês" positioning (overlapping sticky note)
3. "Postais Para Cientistas" section rebuilt as a postcard image gallery
4. Video hosting recommendation (research only, no code change)

i18n is explicitly out of scope — flagged for a future dedicated cycle.

---

## 1. Hero buttons

### What changes

Only `hero-section.component.scss` and `hero-section.component.html`. The global `--primary` token (teal) is untouched — it is used for labels, borders, and other site elements.

### Primary button

`.hero-action--primary` becomes soft lavender:

| Property | Value |
|---|---|
| Background | `oklch(0.92 0.05 290)` |
| Text color | `oklch(0.42 0.14 290)` |
| Border | `1.5px solid oklch(0.72 0.12 290)` |
| Hover background | `oklch(0.88 0.07 290)` |

### Secondary button (new class)

Add `.hero-action--secondary`:

| Property | Value |
|---|---|
| Background | `transparent` |
| Text color | `oklch(0.52 0.14 28)` |
| Border | `1.5px solid oklch(0.68 0.16 28)` |
| Hover background | `oklch(0.94 0.04 28)` |

### HTML changes

- First button ("Disponível Para Conversar"): keeps `hero-action--primary`, href stays `#contact`
- Second button ("Publicações"): changes class from `hero-action--primary` to `hero-action--secondary`, href changes from `#contact` to `#blog`

---

## 2. Sugestão do Mês

### What changes

`hero-section.component.scss` only. No HTML class changes — the note already has `scrapbook-pin-note` and `scrapbook-paper--tilt-left`.

### Approach

Remove the note from the two-column grid flow. Position it as an absolute overlay on the bottom-right corner of the hero card.

- `.hero__board` already has `position: relative`
- Grid changes from `minmax(0, 1.08fr) minmax(0, 0.92fr)` to `1fr`
- `.hero-notes` becomes:

```css
.hero-notes {
  position: absolute;
  bottom: -1.5rem;
  right: -1rem;
  width: 44%;
  z-index: 3;
  margin-top: 0;
}
```

The existing tilt and pin decoration from scrapbook classes creates the overlapping sticky note look.

### Mobile (`max-width: 768px`)

Revert to static position, full width, displayed below the hero card:

```css
.hero-notes {
  position: static;
  width: 100%;
}
```

---

## 3. Postais Para Cientistas

### What changes

`side-projects-section.component.ts`, `side-projects-section.component.html`, `side-projects-section.component.scss`.

The existing text-based project card data (scientific illustration, Pint of Science, outreach) is removed. The section becomes a pure image gallery of postcard fronts.

### Data model

Replace `SideProject` interface and `SIDE_PROJECTS` array with:

```typescript
interface Postcard {
  readonly id: string;
  readonly imagePath: string; // e.g. 'assets/postcards/postcard-01.jpg'
  readonly altText: string;
}

const POSTCARDS: readonly Postcard[] = [
  { id: 'postcard-01', imagePath: 'assets/postcards/postcard-01.jpg', altText: '' },
  { id: 'postcard-02', imagePath: 'assets/postcards/postcard-02.jpg', altText: '' },
  { id: 'postcard-03', imagePath: 'assets/postcards/postcard-03.jpg', altText: '' },
];
```

`altText` values are left empty as placeholders — fill in with descriptive text when images are ready. Images go in `public/assets/postcards/`.

### Layout

Horizontal filmstrip — flex row with scroll snap.

```
[ postcard 1 ] [ postcard 2 ] [ postcard 3 ] →
```

Key CSS properties:

```css
.postcard {
  margin: 0; /* reset browser default figure margin */
}

.postcards-filmstrip {
  display: flex;
  gap: var(--space-6);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: var(--space-4); /* room for shadow */
}

.postcard {
  flex: 0 0 320px;
  scroll-snap-align: start;
  aspect-ratio: 3 / 2;
  background: white;
  padding: 6px;
  box-shadow: 2px 4px 14px oklch(0 0 0 / 0.12);
  border-radius: 4px;
}

.postcard img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 2px;
}
```

Alternating slight rotation (scrapbook feel):

```css
.postcard:nth-child(odd) { transform: rotate(-1.2deg); }
.postcard:nth-child(even) { transform: rotate(1deg); }
.postcard:hover { transform: translateY(-4px) rotate(0deg); }
```

With 3 cards at 320px + gaps, the row fills without scrolling on desktop. Scrollable as more postcards are added.

Mobile (`max-width: 768px`): card width drops to `260px`.

### HTML structure

```html
<div class="postcards-filmstrip" aria-label="Postais Para Cientistas">
  @for (card of postcards; track card.id) {
    <figure class="postcard scrapbook-paper">
      <img
        [src]="card.imagePath"
        [alt]="card.altText"
        loading="lazy"
        decoding="async"
      />
    </figure>
  }
</div>
```

---

## 4. Video hosting (recommendation only)

Vimeo is already fully supported in the codebase (`video-gallery.component.ts:76`). No code changes needed — just upload videos to Vimeo and add entries to `video.data.ts` with `platform: 'vimeo'`.

If privacy or cost becomes a concern, **Cloudflare Stream** integrates well given the project already deploys to Cloudflare (see `wrangler.toml`). Adding Stream support would require:
- Adding `'cloudflare-stream'` to the `platform` union in `video.model.ts`
- Adding a URL builder branch in `buildTrustedEmbedUrl` for `https://iframe.cloudflarestream.com/{id}`

This is a small change when needed, not part of the current implementation.

---

## Files touched

| File | Change |
|---|---|
| `src/app/sections/hero/hero-section.component.scss` | Button color overrides, hero-notes absolute positioning |
| `src/app/sections/hero/hero-section.component.html` | Second button class + href |
| `src/app/sections/side-projects/side-projects-section.component.ts` | New Postcard model + data |
| `src/app/sections/side-projects/side-projects-section.component.html` | Filmstrip markup |
| `src/app/sections/side-projects/side-projects-section.component.scss` | Filmstrip + postcard styles |
| `public/assets/postcards/` | New directory for postcard images (images added separately) |
