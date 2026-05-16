---
source: Context7 API + official docs fallback
library: Angular
package: angular
topic: scss-component-style-patterns
fetched: 2026-05-14T16:22:00Z
official_docs: https://angular.dev/guide/components/styling
---

## SCSS/component style patterns (Angular)

- Angular supports Sass/SCSS in component styles.
- Default encapsulation `ViewEncapsulation.Emulated` scopes styles to component template.
- `:host` supported in emulated mode. `:host-context()` supported by compiler (legacy/deprecated in browsers).
- `ViewEncapsulation.None` makes styles global; use intentionally.
- Avoid new `::ng-deep` use (back-compat only).
- Prefer component-local styles + predictable class structure for maintainability.

### Responsive timeline SCSS pattern

```scss
:host {
  display: block;
}

.timeline {
  display: grid;
  gap: 1rem;
}

.timeline__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.timeline__card {
  display: grid;
  gap: 0.5rem;
  border: 1px solid var(--timeline-border, #d0d7de);
  border-radius: 0.75rem;
  padding: 0.875rem;
}

@media (min-width: 48rem) {
  .timeline__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

### Encapsulation switch example

```ts
@Component({
  // ...
  encapsulation: ViewEncapsulation.Emulated,
})
export class TimelineComponent {}
```

## Sources

- https://angular.dev/guide/components/styling
- https://angular.dev/api/core/ViewEncapsulation
