# Hero UI Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update hero button colors to pastel lavender/coral, reposition "Sugestão do Mês" as an overlapping sticky note, and rebuild "Postais Para Cientistas" as a horizontal postcard image filmstrip.

**Architecture:** Three isolated component-level changes — hero SCSS/HTML for buttons and note positioning, side-projects component fully replaced with a new postcard data model and filmstrip layout. No shared state or service changes. Global `--primary` token is untouched.

**Tech Stack:** Angular 21 standalone components, SCSS, oklch color values, CSS scroll-snap, `npm start` for dev server.

---

## File map

| File | What changes |
|---|---|
| `src/app/sections/hero/hero-section.component.scss` | Lavender primary button, new coral outline secondary, hero-notes absolute positioning |
| `src/app/sections/hero/hero-section.component.html` | Second button class → `hero-action--secondary`, href → `#blog` |
| `src/app/sections/side-projects/side-projects-section.component.ts` | Replace `SideProject` model + `SIDE_PROJECTS` data with `Postcard` model + `POSTCARDS` |
| `src/app/sections/side-projects/side-projects-section.component.html` | Replace project card markup with postcard filmstrip |
| `src/app/sections/side-projects/side-projects-section.component.scss` | Remove project card styles, add filmstrip + postcard styles |
| `public/assets/postcards/` | New directory — images added separately when ready |

---

## Task 1: Hero button colors

**Files:**
- Modify: `src/app/sections/hero/hero-section.component.scss`
- Modify: `src/app/sections/hero/hero-section.component.html`

- [ ] **Step 1: Update `.hero-action--primary` to soft lavender**

In `src/app/sections/hero/hero-section.component.scss`, replace:

```scss
.hero-action--primary {
  border-color: var(--primary);
  background: var(--primary);
  color: var(--primary-foreground);
}

.hero-action--primary:hover {
  background: oklch(0.5 0.13 178);
}
```

With:

```scss
.hero-action--primary {
  border-color: oklch(0.72 0.12 290);
  background: oklch(0.92 0.05 290);
  color: oklch(0.42 0.14 290);
}

.hero-action--primary:hover {
  background: oklch(0.88 0.07 290);
  border-color: oklch(0.65 0.14 290);
}
```

- [ ] **Step 2: Add `.hero-action--secondary` class**

In `src/app/sections/hero/hero-section.component.scss`, add after the `.hero-action--primary:hover` block:

```scss
.hero-action--secondary {
  border-color: oklch(0.68 0.16 28);
  background: transparent;
  color: oklch(0.52 0.14 28);
}

.hero-action--secondary:hover {
  background: oklch(0.94 0.04 28);
  border-color: oklch(0.62 0.16 28);
}
```

- [ ] **Step 3: Update hero HTML — second button**

In `src/app/sections/hero/hero-section.component.html`, replace:

```html
<a class="hero-action hero-action--primary" href="#contact">
  Publicações
</a>
```

With:

```html
<a class="hero-action hero-action--secondary" href="#blog">
  Publicações
</a>
```

- [ ] **Step 4: Start dev server and verify visually**

```bash
npm start
```

Open `http://localhost:4200`. Check:
- Primary button is soft lavender (not teal)
- Secondary button is transparent with coral border and text
- Hover states work on both buttons
- No other buttons on the page changed color

- [ ] **Step 5: Commit**

```bash
git add src/app/sections/hero/hero-section.component.scss \
        src/app/sections/hero/hero-section.component.html
git commit -m "feat(hero): lavender primary button, coral outline secondary button"
```

---

## Task 2: Sugestão do Mês — overlapping sticky note

**Files:**
- Modify: `src/app/sections/hero/hero-section.component.scss`

- [ ] **Step 1: Change hero board to single-column grid**

In `src/app/sections/hero/hero-section.component.scss`, replace:

```scss
.hero__board {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: var(--space-6);
  align-items: start;
}
```

With:

```scss
.hero__board {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  align-items: start;
}
```

- [ ] **Step 2: Make `.hero-notes` absolutely positioned**

In `src/app/sections/hero/hero-section.component.scss`, replace:

```scss
.hero-notes {
  position: relative;
  z-index: 3;
  display: grid;
  gap: var(--space-4);
  margin-top: var(--space-4);
}
```

With:

```scss
.hero-notes {
  position: absolute;
  bottom: -1.5rem;
  right: -1rem;
  width: 44%;
  z-index: 3;
  margin-top: 0;
}
```

- [ ] **Step 3: Remove the 1024px hero-notes grid override**

In `src/app/sections/hero/hero-section.component.scss`, find the `@media (max-width: 1024px)` block and remove the `.hero-notes` rule from it:

```scss
@media (max-width: 1024px) {
  .hero__board {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  /* Remove this entire rule: */
  .hero-notes {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 0;
  }

  /* Remove this entire rule: */
  .hero-note,
  .hero-note:nth-child(2),
  .hero-note:nth-child(3) {
    transform: none;
  }
}
```

After removal the `@media (max-width: 1024px)` block should contain only:

```scss
@media (max-width: 1024px) {
  .hero__board {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }
}
```

- [ ] **Step 4: Add mobile revert for `.hero-notes`**

In `src/app/sections/hero/hero-section.component.scss`, find the `@media (max-width: 768px)` block and add the hero-notes revert inside it:

```scss
@media (max-width: 768px) {
  :host {
    padding: var(--space-12) var(--space-4);
  }

  .hero-card {
    padding: var(--space-6);
  }

  .hero-notes {
    position: static;
    width: 100%;
    margin-top: var(--space-4);
  }

  .hero__actions {
    flex-direction: column;
  }

  .hero-action {
    inline-size: 100%;
  }
}
```

- [ ] **Step 5: Verify visually**

With `npm start` running, open `http://localhost:4200`. Check:
- Desktop: "Sugestão do Mês" note overlaps the bottom-right corner of the hero card, slightly tilted
- The note sits on top of the card (not beside it)
- Resize to <768px: note moves below the hero card, full width, no overlap

- [ ] **Step 6: Commit**

```bash
git add src/app/sections/hero/hero-section.component.scss
git commit -m "feat(hero): reposition Sugestão do Mês as overlapping sticky note"
```

---

## Task 3: Postcard data model

**Files:**
- Modify: `src/app/sections/side-projects/side-projects-section.component.ts`

- [ ] **Step 1: Replace the component TypeScript entirely**

Replace the full contents of `src/app/sections/side-projects/side-projects-section.component.ts` with:

```typescript
import { Component } from '@angular/core';

interface Postcard {
  readonly id: string;
  readonly imagePath: string;
  readonly altText: string;
}

const POSTCARDS: readonly Postcard[] = [
  {
    id: 'postcard-01',
    imagePath: 'assets/postcards/postcard-01.jpg',
    altText: 'Postal para cientistas 1',
  },
  {
    id: 'postcard-02',
    imagePath: 'assets/postcards/postcard-02.jpg',
    altText: 'Postal para cientistas 2',
  },
  {
    id: 'postcard-03',
    imagePath: 'assets/postcards/postcard-03.jpg',
    altText: 'Postal para cientistas 3',
  },
];

@Component({
  selector: 'app-side-projects-section',
  standalone: true,
  templateUrl: './side-projects-section.component.html',
  styleUrl: './side-projects-section.component.scss',
})
export class SideProjectsSectionComponent {
  protected readonly postcards = POSTCARDS;
}
```

Note: `altText` values use generic Portuguese placeholders. Update them with descriptive text when the actual postcard images are ready.

- [ ] **Step 2: Commit**

```bash
git add src/app/sections/side-projects/side-projects-section.component.ts
git commit -m "feat(postais): replace SideProject model with Postcard model"
```

---

## Task 4: Postcard filmstrip markup

**Files:**
- Modify: `src/app/sections/side-projects/side-projects-section.component.html`

- [ ] **Step 1: Replace the template entirely**

Replace the full contents of `src/app/sections/side-projects/side-projects-section.component.html` with:

```html
<section id="side-projects" aria-labelledby="side-projects-title" class="side-projects">
  <header class="side-projects__header scrapbook-paper scrapbook-stamp scrapbook-doodle-wave">
    <p class="side-projects__eyebrow">Projetos & hobbies · beyond benchwork</p>
    <h2 id="side-projects-title">
      Postais Para Cientistas
    </h2>
  </header>

  <div class="scribble-divider side-projects__divider" aria-hidden="true"></div>

  <div class="postcards-filmstrip" aria-label="Galeria de postais para cientistas">
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
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sections/side-projects/side-projects-section.component.html
git commit -m "feat(postais): replace project cards with postcard filmstrip markup"
```

---

## Task 5: Postcard filmstrip styles

**Files:**
- Modify: `src/app/sections/side-projects/side-projects-section.component.scss`

- [ ] **Step 1: Replace the stylesheet entirely**

Replace the full contents of `src/app/sections/side-projects/side-projects-section.component.scss` with:

```scss
:host {
  display: block;
  background: var(--accent-lavender-light);
  padding: var(--space-20) var(--space-6);
  overflow-x: clip;
}

.side-projects {
  width: min(100%, var(--container-max));
  margin-inline: auto;
}

.side-projects__header {
  padding: var(--space-6);
  max-width: min(100%, 64ch);
}

.side-projects__header::after {
  content: '';
  position: absolute;
  right: var(--space-4);
  top: var(--space-4);
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 2px dashed oklch(0.33 0.03 259 / 0.4);
}

.side-projects__eyebrow {
  margin: 0;
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  background: oklch(1 0 0 / 0.7);
  font-size: var(--step--2);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-lavender);
}

h2 {
  margin-top: var(--space-3);
}

.side-projects__divider {
  margin-top: var(--space-6);
}

.postcards-filmstrip {
  display: flex;
  gap: var(--space-6);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: var(--space-4);
  margin-top: var(--space-8);
}

.postcard {
  flex: 0 0 320px;
  scroll-snap-align: start;
  aspect-ratio: 3 / 2;
  margin: 0;
  background: white;
  padding: 6px;
  box-shadow: 2px 4px 14px oklch(0 0 0 / 0.12);
  border-radius: 4px;
  transition: transform var(--motion-fast) var(--ease-standard);
}

.postcard:nth-child(odd) {
  transform: rotate(-1.2deg);
}

.postcard:nth-child(even) {
  transform: rotate(1deg);
}

.postcard:hover {
  transform: translateY(-4px) rotate(0deg);
}

.postcard img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 2px;
}

@media (max-width: 768px) {
  :host {
    padding: var(--space-12) var(--space-4);
  }

  .side-projects__header {
    padding: var(--space-5);
  }

  .postcard {
    flex: 0 0 260px;
  }
}

@media (max-width: 480px) {
  :host {
    padding: var(--space-10) var(--space-3);
  }

  .side-projects__header {
    padding: var(--space-4);
  }
}

@media (prefers-reduced-motion: reduce) {
  .postcard,
  .postcard:nth-child(odd),
  .postcard:nth-child(even),
  .postcard:hover {
    transform: none;
  }
}
```

- [ ] **Step 2: Verify visually**

With `npm start` running, open `http://localhost:4200` and scroll to the "Postais Para Cientistas" section. Check:
- Three postcard-shaped slots rendered (broken image icons expected — no images yet)
- Cards are landscape 3:2 ratio, white-bordered, with shadow
- Alternating slight rotation
- Hover lifts the card and removes rotation
- Section background is still lavender
- On mobile (<768px): cards are 260px wide, horizontally scrollable

- [ ] **Step 3: Commit**

```bash
git add src/app/sections/side-projects/side-projects-section.component.scss
git commit -m "feat(postais): add postcard filmstrip styles"
```

---

## Task 6: Create postcards asset directory

**Files:**
- Create: `public/assets/postcards/.gitkeep`

- [ ] **Step 1: Create the directory with a gitkeep**

```bash
mkdir -p public/assets/postcards
touch public/assets/postcards/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add public/assets/postcards/.gitkeep
git commit -m "chore: add postcards asset directory"
```

---

## Done

All changes are isolated to their components. No shared services, routes, or tokens were modified.

When postcard images are ready:
1. Drop JPG/PNG files into `public/assets/postcards/`
2. Update `altText` values in `side-projects-section.component.ts` with descriptive Portuguese text
3. Update `imagePath` values if filenames differ from `postcard-01.jpg` etc.
