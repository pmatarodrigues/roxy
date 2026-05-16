# Dynamic Scrapbook UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** make section visuals more dynamic and fun by replacing repetitive adhesive usage with fixed per-section motif signatures.

**Architecture:** keep existing section components and color tokens, but refactor shared scrapbook utilities and re-map section HTML classes. each section gets one primary motif and one support motif to keep variation high and visual noise low.

**Tech Stack:** Angular standalone components, SCSS utilities, Jasmine/Vitest (`ng test`), Angular build (`ng build`).

---

### Task 1: Lock anti-repetition behavior with failing test

**Files:**
- Modify: `src/app/app.spec.ts`

- [ ] **Step 1: Add failing test for tape concentration**

```ts
it('should keep adhesive motif limited to hero and writing sections', async () => {
  const fixture = await createAppOnHomeRoute();
  const compiled = fixture.nativeElement as HTMLElement;
  const tapedNodes = compiled.querySelectorAll('main section .scrapbook-tape');

  expect(tapedNodes.length).toBeGreaterThan(0);
  expect(tapedNodes.length).toBeLessThanOrEqual(4);
  expect(compiled.querySelector('#hero .scrapbook-tape')).toBeTruthy();
  expect(compiled.querySelector('#blog .scrapbook-tape')).toBeTruthy();
});
```

- [ ] **Step 2: Run focused test and verify initial failure**

Run: `npm run test -- --watch=false --include src/app/app.spec.ts`

Expected: FAIL on `.scrapbook-tape` count upper bound.

- [ ] **Step 3: Commit**

```bash
git add src/app/app.spec.ts
git commit -m "test: lock scrapbook adhesive repetition ceiling"
```

### Task 2: Refactor shared motif utilities in global styles

**Files:**
- Modify: `src/styles.scss`

- [ ] **Step 1: Keep paper + divider base utilities; add motif utilities**

Add new classes:

- `.scrapbook-paperclip`
- `.scrapbook-ribbon-top`
- `.scrapbook-stamp`
- `.scrapbook-torn-edge`
- `.scrapbook-ticket-corner`
- `.scrapbook-doodle-wave`

- [ ] **Step 2: Keep tape utility but stop relying on it globally**

Only sections that intentionally need tape should keep `.scrapbook-tape` class in their HTML.

- [ ] **Step 3: Run style-sensitive build check**

Run: `npm run build`

Expected: PASS, no new `anyComponentStyle` warnings.

- [ ] **Step 4: Commit**

```bash
git add src/styles.scss
git commit -m "feat: add dynamic scrapbook motif utilities"
```

### Task 3: Apply signature motifs to hero and writing sections

**Files:**
- Modify: `src/app/sections/hero/hero-section.component.html`
- Modify: `src/app/sections/hero/hero-section.component.scss`
- Modify: `src/app/sections/blog/blog-section.component.html`
- Modify: `src/app/sections/blog/blog-section.component.scss`

- [ ] **Step 1: Hero mapping**

- hero card keeps tape (`scrapbook-tape`) and gains doodle wave
- hero notes replace tape with paperclip/stamp combinations

- [ ] **Step 2: Writing mapping**

- blog header/newsletter uses paperclip or torn-edge
- blog cards alternate torn-edge and stamp accents; retain only limited tape instances

- [ ] **Step 3: Validate test + build**

Run: `npm run test -- --watch=false --include src/app/app.spec.ts && npm run build`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/sections/hero/hero-section.component.html src/app/sections/hero/hero-section.component.scss src/app/sections/blog/blog-section.component.html src/app/sections/blog/blog-section.component.scss
git commit -m "feat: apply dynamic motifs to hero and writing"
```

### Task 4: Apply signature motifs to interests, media, journey, role-fit, contact

**Files:**
- Modify: `src/app/sections/side-projects/side-projects-section.component.html`
- Modify: `src/app/sections/side-projects/side-projects-section.component.scss`
- Modify: `src/app/sections/videos/video-gallery.component.html`
- Modify: `src/app/sections/videos/video-gallery.component.scss`
- Modify: `src/app/sections/transition/transition-section.component.html`
- Modify: `src/app/sections/transition/transition-section.component.scss`
- Modify: `src/app/sections/role-fit/role-fit-section.component.html`
- Modify: `src/app/sections/role-fit/role-fit-section.component.scss`
- Modify: `src/app/sections/contact/contact-section.component.html`
- Modify: `src/app/sections/contact/contact-section.component.scss`

- [ ] **Step 1: Interests mapping**

Use stamp + doodle combinations; remove repeated tape.

- [ ] **Step 2: Media mapping**

Use ribbon header + ticket-corner cards; remove tape from filter shell and media cards.

- [ ] **Step 3: Journey mapping**

Use postcard/paperclip accents with dotted connectors; no tape.

- [ ] **Step 4: Role-fit + contact mapping**

Use folder-tab/marker feel in role-fit and pinned-note look in contact without tape repetition.

- [ ] **Step 5: Validate tests and build**

Run: `npm run test -- --watch=false && npm run build`

Expected: PASS, no regressions.

- [ ] **Step 6: Commit**

```bash
git add src/app/sections/side-projects/side-projects-section.component.html src/app/sections/side-projects/side-projects-section.component.scss src/app/sections/videos/video-gallery.component.html src/app/sections/videos/video-gallery.component.scss src/app/sections/transition/transition-section.component.html src/app/sections/transition/transition-section.component.scss src/app/sections/role-fit/role-fit-section.component.html src/app/sections/role-fit/role-fit-section.component.scss src/app/sections/contact/contact-section.component.html src/app/sections/contact/contact-section.component.scss
git commit -m "feat: assign unique scrapbook motifs per section"
```

### Task 5: Final QA and visual verification

**Files:**
- Verify only

- [ ] **Step 1: Run full verification**

Run: `npm run test -- --watch=false && npm run build`

Expected: PASS.

- [ ] **Step 2: Manual viewport check**

Check at 375px, 768px, 1024px, 1440px:

- each section has distinct motif signature
- no decorative overlap over core text
- reduced-motion behavior remains stable

- [ ] **Step 3: Commit QA note**

```bash
git add -A
git commit -m "chore: validate dynamic scrapbook motif refresh"
```
