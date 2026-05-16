---
project: roxy-portfolio
feature: visual-refinement
created: 2026-05-14T00:00:00Z
updated: 2026-05-14T00:00:00Z
status: in_progress
current_stage: theme
---

# Design Plan: Visual Refinement Pass

## User Feedback

- Font does not feel right
- Color palette feels too white / generic
- Top menu alignment feels off
- Mobile experience not friendly

## Refinement Goals

- Replace typography with more characterful but recruiter-readable pair
- Increase color atmosphere and depth while preserving clarity
- Rebuild top navigation alignment and spacing
- Improve mobile behavior for navigation and section density

## Stage 1: Layout Adjustments

- Keep section architecture
- Refactor top nav from dense grid to consistent alignment model
- Improve mobile nav interaction and readability

## Stage 2: Theme Adjustments

- Update global tokens (richer base, stronger accents)
- Introduce nuanced gradients and section color variation
- Keep WCAG-friendly contrast for text and controls

## Stage 3: Motion/Interaction

- Keep restrained hover/focus motion
- Preserve reduced-motion behavior

## Stage 4: Implementation Scope

- `src/styles/tokens.css`
- `src/styles/typography.css`
- `src/styles.scss`
- `src/app/app.scss`
- section-level SCSS refinements for color and mobile spacing
