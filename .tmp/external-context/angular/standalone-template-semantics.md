---
source: Context7 API
library: Angular
package: angular
topic: standalone-component-template-semantics-and-control-flow
fetched: 2026-05-14T16:22:00Z
official_docs: https://angular.dev/guide/templates
---

## Standalone template semantics (Angular current docs)

- Templates are HTML + Angular syntax.
- `@` drives control flow (`@if`, `@for`, `@switch`); escape literal `@` as `&#64;`.
- Use `@for (...; track ...)` with stable key (`id`/`uuid`) for update performance.
- Keep template expressions simple; move complex derivations to class code (`computed`).
- Angular v20+ standalone default; no `standalone: true` needed.

### Control-flow patterns

```html
@if (a > b) {
<p>{{ a }} is greater than {{ b }}</p>
} @else if (b > a) {
<p>{{ a }} is less than {{ b }}</p>
} @else {
<p>{{ a }} is equal to {{ b }}</p>
}
```

```html
@for (item of items; track item.id) {
<li>{{ item.name }}</li>
} @empty {
<li>There are no items.</li>
}
```

### Scrapbook timeline semantic template shape

```html
<section aria-label="Scrapbook timeline">
  @if (events().length) {
  <ol>
    @for (event of events(); track event.id) {
    <li>
      <article>
        <header>
          <h3>{{ event.title }}</h3>
          <time [attr.datetime]="event.isoDate">{{ event.displayDate }}</time>
        </header>
        <p>{{ event.description }}</p>
      </article>
    </li>
    }
  </ol>
  } @else {
  <p>No entries yet.</p>
  }
</section>
```

## Sources

- https://angular.dev/guide/templates
- https://angular.dev/guide/templates/control-flow
- https://angular.dev/style-guide
