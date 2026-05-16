---
source: Context7 API + official docs fallback
library: Angular
package: angular
topic: template-accessibility-best-practices
fetched: 2026-05-14T16:22:00Z
official_docs: https://angular.dev/best-practices/a11y
---

## Template accessibility best practices (Angular)

- Prefer native interactive elements (`button`, `a`, `input`) over custom clickable containers.
- Bind ARIA in templates directly: `[aria-label]`, static `aria-*`, or `[attr.aria-*]` when needed.
- Preserve semantic structure first; ARIA augments semantics, not replacement.
- Manage focus on route change (`NavigationEnd`) to main heading/primary content.
- Mark active nav links with `aria-current` via `ariaCurrentWhenActive` on `RouterLinkActive`.
- For deferred content (`@defer`), consider live-region announcement strategy.
- For dialogs/overlays, use focus trapping (`cdkTrapFocus`) and screen-reader announcements (`LiveAnnouncer`) where needed.

### ARIA binding examples

```html
<button [aria-label]="actionLabel()">{{ actionLabel() }}</button>
<button aria-label="Save document">Save</button>
```

### Active route semantics

```html
<nav>
  <a routerLink="home" routerLinkActive="active-page" ariaCurrentWhenActive="page">Home</a>
  <a routerLink="timeline" routerLinkActive="active-page" ariaCurrentWhenActive="page">Timeline</a>
</nav>
```

### Timeline-specific a11y checks

- Use ordered list (`ol/li`) for chronological sequence.
- Use `<time datetime="...">` for machine-readable dates.
- Ensure keyboard reachable controls for expand/collapse/cards.
- Keep heading hierarchy logical (`h2` section, `h3` card titles).
- Validate color contrast + focus ring visibility in scrapbook theme.

## Sources

- https://angular.dev/best-practices/a11y
- https://angular.dev/guide/templates/binding#aria-attributes
