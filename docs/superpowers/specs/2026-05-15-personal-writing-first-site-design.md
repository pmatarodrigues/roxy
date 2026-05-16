# Personal Writing-First Site Design

## Goal

Reframe the portfolio into a personal page where writing and interests lead, while keeping career credibility as a secondary layer for MSL and science communication opportunities.

## Context

- Current site visually matches scrapbook/editorial direction.
- Current messaging leans too role-specific and career-forward.
- User requested broader CTA language: `open to conversations · aberta a conversas` in both hero and contact.
- User also requested documenting an outreach strategy, but clarified this is not the primary website purpose.

## Product Direction

### Primary Outcome

The site feels like a personal writing home:

- personal voice first
- interests and curiosity visible
- writing is easiest path for visitors

### Secondary Outcome

Career credibility still visible but not dominant:

- role-fit evidence remains as supporting section
- no hard-sell role language in hero/contact CTA

## Information Hierarchy

### Section Priority

1. Hero (personal voice)
2. Writing (blog)
3. Interests/hobbies
4. Media (talks/videos)
5. Journey
6. Role-fit (supporting proof)
7. Contact

### Navigation Priority

`Introduction`, `Writing`, `Interests`, `Media`, `Journey`, `Contact`.

## Messaging Decisions

### CTA

Use exact broad CTA in hero and contact primary action:

- `open to conversations · aberta a conversas`

### Support Line

Use broad collaboration language:

- `science, writing, ideas, collaborations`

### Tone

- personal, reflective, science-literate
- avoid narrow role-specific invitation text

## Non-Website Operational Strategy (Documented Only)

Execution strategy is tracked in a separate playbook:

- approach 2 first (content-led reach)
- approach 3 second (credibility ladder)
- optional freelance lane with 300 EUR/month net floor

This strategy supports opportunities but does not change the primary website identity.

## Constraints

- Keep existing color tokens unchanged (`src/styles/tokens.css`).
- Preserve scrapbook visual system already implemented.
- Keep responsive and accessibility quality gates.

## Acceptance Criteria

- Writing appears before media in homepage order and navigation emphasis.
- Hero + contact primary CTA both use broad conversation wording.
- Hero copy no longer centers narrow role conversion.
- Contact support language uses broad topic framing.
- Tests pass and production build passes.
