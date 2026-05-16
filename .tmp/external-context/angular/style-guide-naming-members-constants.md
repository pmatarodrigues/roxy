---
source: Context7 API + official docs fallback
library: Angular
package: angular
topic: style-guide-naming-conventions-component-members-constants
fetched: 2026-05-14T16:22:00Z
official_docs: https://angular.dev/style-guide
---

## Style-guide naming + member conventions (Angular)

- File names: hyphen-case (`user-profile.ts`), test file suffix `.spec.ts`.
- Keep component TS/template/style base name aligned (`timeline.ts/.html/.scss`).
- Group Angular-specific members near top: injected deps, inputs, outputs, queries, then methods.
- Use `protected` for members consumed only by template.
- Use `readonly` for Angular-initialized properties (`input`, `model`, `output`, queries).
- Prefer meaningful handler names by behavior (`saveUserData`) not trigger (`handleClick`).

### Inputs/outputs naming

- Input/output names: camelCase, case-sensitive.
- Avoid collisions with native DOM properties/events.
- Avoid component-style prefixes for input/output names.
- Avoid output names prefixed with `on`.

### Example member layout

```ts
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class TimelineComponent {
  // Angular-specific members first
  readonly entries = input.required<readonly TimelineEntry[]>();
  readonly entrySelected = output<TimelineEntry>();

  // Template-only derived state
  protected readonly hasEntries = computed(() => this.entries().length > 0);

  // Methods after properties
  protected selectEntry(entry: TimelineEntry): void {
    this.entrySelected.emit(entry);
  }
}
```

## Sources

- https://angular.dev/style-guide
- https://angular.dev/guide/components/inputs#choosing-input-names
- https://angular.dev/guide/components/outputs#choosing-event-names
