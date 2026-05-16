---
source: Context7 API
library: Angular
package: angular
topic: template-accessibility-form-semantics
fetched: 2026-05-14T16:00:00Z
official_docs: https://angular.dev/best-practices/a11y and https://angular.dev/guide/forms/form-validation
---

## Template accessibility semantics: form controls, fieldset, legend, labels

### Core semantics

- Use native form elements first (`label`, `input`, `fieldset`, `legend`).
- Keep explicit label association (`for` + input `id`) or wrap input in label.
- Preserve `required` attribute in template for accessibility semantics.
- Group related controls with `fieldset` + short, descriptive `legend`.

### Angular template example (reactive/forms + control flow)

```html
<form novalidate>
  <fieldset>
    <legend>Address</legend>

    <label for="street">Street</label>
    <input id="street" [formControl]="street" required />

    @if (street.touched && street.invalid) {
    <div class="error-list">
      <p>Street is required</p>
    </div>
    }
  </fieldset>
</form>
```

### Practical guidance for gallery filter UI

- Filter toggles/selects: ensure visible label text.
- Checkbox/radio groups: use `fieldset`/`legend` for shared context.
- Error/help text: render conditionally with `@if`; wire `aria-describedby` when needed.
