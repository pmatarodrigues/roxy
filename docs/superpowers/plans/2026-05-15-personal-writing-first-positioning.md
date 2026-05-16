# Personal Writing-First Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** prioritize personal writing and interests on the homepage while keeping role credibility secondary.

**Architecture:** adjust existing Angular standalone sections and shell navigation only. no new runtime dependencies. preserve scrapbook visual system and color tokens.

**Tech Stack:** Angular standalone components, SCSS, Jasmine/Vitest via Angular CLI.

---

### Task 1: lock expectations with tests

**Files:**
- Modify: `src/app/app.spec.ts`

- [ ] add failing tests for writing-first nav labels
- [ ] add failing test for section order (`blog` before `videos`)
- [ ] add failing test for broad CTA in hero and contact
- [ ] run `npm run test -- --watch=false --include src/app/app.spec.ts`

### Task 2: reorder homepage and navigation

**Files:**
- Modify: `src/app/app.ts`
- Modify: `src/app/pages/home-page.component.ts`

- [ ] reorder nav labels and notes to writing-first hierarchy
- [ ] reorder home sections so writing appears before media
- [ ] run targeted app spec tests

### Task 3: broaden CTA language

**Files:**
- Modify: `src/app/sections/hero/hero-section.component.ts`
- Modify: `src/app/sections/hero/hero-section.component.html`
- Modify: `src/app/sections/contact/contact-section.component.html`

- [ ] remove narrow role-forward CTA language
- [ ] set hero and contact primary CTA to `open to conversations · aberta a conversas`
- [ ] set support line to broad topics (`science, writing, ideas, collaborations`)

### Task 4: document off-site reach strategy

**Files:**
- Create: `docs/personal-brand/2026-05-15-reach-and-opportunity-playbook.md`

- [ ] document 90-day content-led reach strategy
- [ ] document optional freelance lane and lead sources
- [ ] keep strategy document separate from website core identity

### Task 5: final verification

**Files:**
- Verify only

- [ ] run `npm run test -- --watch=false`
- [ ] run `npm run build`
- [ ] ensure no new style budget warnings/regressions
