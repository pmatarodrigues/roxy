---
source: Context7 API
library: Angular
package: angular
topic: control-flow-if-for
fetched: 2026-05-14T16:00:00Z
official_docs: https://angular.dev/guide/templates/control-flow
---

## Angular template control flow: `@if` / `@for`

Use native control-flow blocks in templates.

### `@if`

```html
@if (isVisible) {
<p>This is visible</p>
} @else if (isLoading) {
<p>Loading...</p>
} @else {
<p>Not visible</p>
}
```

- `@if` for conditional rendering.
- `@else if` and `@else` for branching.

### `@for`

```html
@for (item of items; track item.id) {
<li>{{ item.name }}</li>
}
```

- `track` required for identity/perf.
- Loop context vars: `$index`, `$first`, `$last`, `$even`, `$odd`.

### Best-practice notes

- Prefer `@if`, `@for`, `@switch` over legacy structural directives.
- In list-heavy components (gallery/cards), always track stable item id.
