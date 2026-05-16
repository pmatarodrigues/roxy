# Dynamic Scrapbook UI Design

## Goal

Make the portfolio more dynamic and fun by removing repetitive adhesive/tape visuals and giving each section a distinct scrapbook identity inspired by the provided reference screenshots.

## User-Approved Direction

- Variation level: balanced playful.
- Motif style: equal mix of torn-paper, ribbon/scribble, and polaroid/stamp accents.
- Motif behavior: fixed per section (not random).
- Design route: section signature system.

## Constraints

- Keep current color scheme exactly as implemented.
- Do not change `src/styles/tokens.css`.
- Preserve mobile readability and accessibility.
- Keep decorative motion subtle and optional (respect reduced-motion).

## Section Signature System

Each section gets one hero motif + one support motif.

- Hero: polaroid frame + hand-scribble wave.
- Writing: torn-paper stack + paperclip corners.
- Interests: sticker/stamp accents + dashed sketch boxes.
- Media: ribbon band header + ticket-cut card corners.
- Journey: postcard milestone cards + dotted path connectors.
- Role-fit: folder-tab cards + marker highlight streaks.
- Contact: pinned note board + envelope doodle cue.

### Anti-Repetition Rule

- Adhesive/tape appears in at most two sections (hero and writing).
- No global always-on tape utility across all sections.

## Rhythm and Layout Rules

- Section rhythm alternates by layout profile:
  1. full-width collage
  2. contained board
  3. split composition
  4. repeat cycle
- Every section keeps content-first hierarchy; decorative layers remain secondary.

## Motion Rules

- Motion layers limited to:
  - load stagger reveal
  - hover tilt reset
  - subtle ribbon drift
- Reduced-motion mode disables decorative transforms and keeps interaction/focus clarity.

## Implementation Boundary

### Global Base

- Modify `src/styles.scss`:
  - remove repetitive global tape behavior
  - introduce motif utilities:
    - `scrapbook-paperclip`
    - `scrapbook-ribbon`
    - `scrapbook-stamp`
    - `scrapbook-torn-edge`
    - `scrapbook-doodle-line`
    - `scrapbook-ticket-corner`

### Section Styles

- Modify:
  - `src/app/sections/hero/hero-section.component.scss`
  - `src/app/sections/blog/blog-section.component.scss`
  - `src/app/sections/side-projects/side-projects-section.component.scss`
  - `src/app/sections/videos/video-gallery.component.scss`
  - `src/app/sections/transition/transition-section.component.scss`
  - `src/app/sections/role-fit/role-fit-section.component.scss`
  - `src/app/sections/contact/contact-section.component.scss`

### Section Markup

- Small class-level updates in section HTML templates to map motif classes.

## Acceptance Criteria

- Each section has a visibly distinct motif signature.
- Adhesive/tape repetition removed from most sections.
- UI feels more dynamic and playful while preserving readability.
- Mobile layout remains clear at 375/768/1024/1440 widths.
- Reduced-motion experience remains stable.
- `npm run test -- --watch=false` passes.
- `npm run build` passes.
- No color token edits in `src/styles/tokens.css`.

## Out of Scope

- Changing content strategy or page information architecture.
- Introducing new UI libraries.
- Rewriting data model/business logic.
