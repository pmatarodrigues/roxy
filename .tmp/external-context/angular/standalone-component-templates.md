---
source: Context7 API
library: Angular
package: angular
topic: standalone-component-templates
fetched: 2026-05-14T16:00:00Z
official_docs: https://angular.dev/guide/components and https://angular.dev/reference/migrations/standalone
---

## Standalone component template best practices (current Angular)

- Prefer standalone components over NgModules.
- Angular v20+: standalone is default; do not add `standalone: true` in decorators.
- Keep template logic simple; prefer native template control blocks.
- Use `ChangeDetectionStrategy.OnPush` for component performance.

### Migration reference (from Angular standalone migration docs)

```ts
// before
@Component({
  selector: 'greeter',
  template: '<div *ngIf="showGreeting">Hello</div>',
  standalone: false,
})
export class Greeter {}

// after
@Component({
  selector: 'greeter',
  template: '<div *ngIf="showGreeting">Hello</div>',
  imports: [NgIf],
})
export class Greeter {}
```

### Notes for existing component updates

- Safe to update HTML/SCSS/TS structure and semantics without changing filtering/business logic.
- Keep inputs/outputs and data transforms unchanged; limit to presentation + accessibility improvements.
