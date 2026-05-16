# Task Context: Portfolio Redesign for Personal Brand Pivot

Session ID: 2026-05-14-portfolio-redesign
Created: 2026-05-14
Status: in_progress

## Current Request

Redesign this web portfolio for a biology PhD who wants to expose hobbies and build a personal brand to transition into medical writer / medical science liaison / science communication roles. Follow inspiration style from provided images. Keep the exact color scheme already implemented in code. Use EN/PT mixed copy.

## Context Files (Standards to Follow)

- /Users/ctw04224/.config/opencode/context/core/standards/code-quality.md
- /Users/ctw04224/.config/opencode/context/core/standards/test-coverage.md
- /Users/ctw04224/.config/opencode/context/core/standards/documentation.md
- /Users/ctw04224/.config/opencode/context/ui/web/ui-styling-standards.md
- /Users/ctw04224/.config/opencode/context/core/workflows/component-planning.md
- /Users/ctw04224/.config/opencode/context/core/workflows/design-iteration-overview.md
- /Users/ctw04224/.config/opencode/context/core/workflows/design-iteration-plan-file.md
- /Users/ctw04224/.config/opencode/context/core/workflows/design-iteration-stage-implementation.md
- /Users/ctw04224/.config/opencode/context/openagents-repo/guides/external-libraries-workflow.md

## Reference Files (Source Material to Look At)

- /Users/ctw04224/Projects/roxy/package.json
- /Users/ctw04224/Projects/roxy/src/styles/tokens.css
- /Users/ctw04224/Projects/roxy/src/styles.scss
- /Users/ctw04224/Projects/roxy/src/app/pages/home-page.component.ts
- /Users/ctw04224/Projects/roxy/src/app/sections/hero/hero-section.component.ts
- /Users/ctw04224/Projects/roxy/src/app/sections/hero/hero-section.component.html
- /Users/ctw04224/Projects/roxy/src/app/sections/hero/hero-section.component.scss
- /Users/ctw04224/Projects/roxy/src/app/sections/videos/video-gallery.component.ts
- /Users/ctw04224/Projects/roxy/src/app/sections/videos/video-gallery.component.html
- /Users/ctw04224/Projects/roxy/src/app/sections/videos/video-gallery.component.scss
- /Users/ctw04224/Projects/roxy/src/app/sections/side-projects/side-projects-section.component.ts
- /Users/ctw04224/Projects/roxy/src/app/sections/side-projects/side-projects-section.component.html
- /Users/ctw04224/Projects/roxy/src/app/sections/side-projects/side-projects-section.component.scss
- /Users/ctw04224/Projects/roxy/src/app/sections/blog/blog-section.component.ts
- /Users/ctw04224/Projects/roxy/src/app/sections/blog/blog-section.component.html
- /Users/ctw04224/Projects/roxy/src/app/sections/blog/blog-section.component.scss
- /Users/ctw04224/Projects/roxy/src/app/sections/transition/transition-section.component.ts
- /Users/ctw04224/Projects/roxy/src/app/sections/transition/transition-section.component.html
- /Users/ctw04224/Projects/roxy/src/app/sections/transition/transition-section.component.scss
- /Users/ctw04224/Projects/roxy/src/app/sections/contact/contact-section.component.ts
- /Users/ctw04224/Projects/roxy/src/app/sections/contact/contact-section.component.html
- /Users/ctw04224/Projects/roxy/src/app/sections/contact/contact-section.component.scss
- /Users/ctw04224/Projects/roxy/src/app/sections/role-fit/role-fit-section.component.ts
- /Users/ctw04224/Projects/roxy/src/app/sections/role-fit/role-fit-section.component.html
- /Users/ctw04224/Projects/roxy/src/app/sections/role-fit/role-fit-section.component.scss

## External Docs Fetched

- None. No new external libraries planned.

## Components

- Hero / Introduction narrative
- Talks & Videos showcase
- Ongoing projects & hobbies board
- Writing / Blog cards
- Career transition framing (role-fit)
- Contact conversion section
- Shared scrapbook visual utility layer (paper/tape/dividers)

## Constraints

- Keep exact existing color tokens and palette in `src/styles/tokens.css` unchanged.
- Inspiration style: scrapbook/editorial collage (paper, tape, asymmetry, hand-written accents, thick dividers).
- Language tone: EN/PT mixed copy.
- Maintain standalone Angular components and section structure.
- Keep accessibility and responsive behavior (mobile-first).
- Avoid introducing new dependencies unless explicitly approved.

## Exit Criteria

- [ ] All homepage sections redesigned to scrapbook/editorial style aligned with inspiration images.
- [ ] Existing color scheme preserved exactly (no palette token changes).
- [ ] EN/PT mixed microcopy applied consistently in key headings/CTAs.
- [ ] Responsive layout validated at 375px, 768px, 1024px, 1440px.
- [ ] Build passes successfully.
