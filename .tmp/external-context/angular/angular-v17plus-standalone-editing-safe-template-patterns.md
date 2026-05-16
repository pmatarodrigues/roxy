---
source: Context7 API
library: Angular
package: angular
topic: standalone component editing best practices, @for control flow, accessibility semantics, SCSS encapsulation
fetched: 2026-05-14T16:10:00Z
official_docs: https://angular.dev
---

## Scope

Angular v17+ syntax. Focus: editing existing standalone component files safely.

## 1) `@Component` usage in standalone components

- Standalone component model preferred.
- Import template dependencies in decorator `imports` (components/directives/pipes used in template).
- Keep external paths relative to component TS file (`templateUrl`, `styleUrl`/`styleUrls`).
- Prefer `ChangeDetectionStrategy.OnPush` for predictable updates/perf.

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
```

Safe edit pattern:

- If template adds new directive/pipe/component, update `imports` same change.
- Do not leave stale imports after template cleanup.

## 2) Template control flow: `@for` (v17+)

- Use native control flow (`@for`) instead of `*ngFor` in modern templates.
- Always provide stable `track` key when possible (`track item.id` preferred).
- Avoid non-unique track expressions (can trigger incorrect DOM mapping/errors).
- `track $index` acceptable for static/no-reorder lists; avoid for frequently reordered lists.

```html
@for (item of items; track item.id) {
<li>{{ item.name }}</li>
}
```

Safe edit pattern:

- When changing list item shape, verify `track` key still unique and stable.
- If no unique id exists, temporary fallback `track item` works but can degrade updates.

## 3) Accessibility semantics in templates

- Prefer semantic HTML first (real `<button>`, headings, lists, landmarks) before ARIA.
- Bind ARIA attributes via attribute binding when dynamic.
- Hide decorative icons from AT with `aria-hidden="true"`.
- Keep keyboard/focus behavior intact when editing interactive markup.

```html
<button type="button" [aria-label]="actionLabel()">{{ actionLabel() }}</button>

<span class="icon" aria-hidden="true">check</span>
```

Safe edit pattern:

- If replacing `<button>` with non-semantic element, add role/keyboard handling (or avoid replacement).
- If adding ARIA, ensure attribute values stay in sync with state.

## 4) SCSS style encapsulation guidance

- Default encapsulation is `ViewEncapsulation.Emulated` (component-scoped styles).
- `ViewEncapsulation.None` makes styles global; use only with explicit intent.
- `ViewEncapsulation.ShadowDom` uses native Shadow DOM boundaries.
- In Emulated mode, `:host` and `:host-context()` supported by Angular transforms.

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.Emulated, // default
})
export class ProfilePhoto {}
```

```scss
:host {
  display: block;
}
```

Safe edit pattern:

- Keep most component SCSS local under Emulated.
- Avoid switching to `None` during quick fixes; can leak styles app-wide.
- Prefer `:host` for host element styling in component stylesheet.

## Consolidated “safe template patterns” checklist

- Use native control flow (`@if/@for/@switch`) with simple expressions.
- Keep heavy logic in TS/computed signals, not inline templates.
- Keep `@for track` unique/stable.
- Preserve semantic elements + focus order.
- Add/update decorator `imports` whenever template dependencies change.
- Keep style scope explicit; avoid accidental global leakage.

## Source anchors

- Components: https://angular.dev/guide/components
- Control flow: https://angular.dev/guide/templates/control-flow
- Accessibility best practices: https://angular.dev/best-practices/a11y
- Styling + encapsulation: https://angular.dev/guide/components/styling
