---
source: Context7 API
library: Angular
package: angular
topic: safe-iframe-usage
fetched: 2026-05-14T16:00:00Z
official_docs: https://angular.dev/best-practices/security and https://angular.dev/api/platform-browser/DomSanitizer
---

## Safe iframe usage in Angular

`iframe[src]` uses Resource URL security context.

### Key security facts

- Angular sanitizes many contexts, but Resource URL cannot be sanitized automatically.
- Use `DomSanitizer.bypassSecurityTrustResourceUrl` only for trusted, validated URLs.
- Never pass raw user input directly to iframe `src`.

### Minimal trusted-url pattern

```ts
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

updateVideoUrl(id: string) {
  this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
}
```

### Best-practice checklist

- Allowlist hosts/paths (e.g., youtube-nocookie.com embed only).
- Build trusted value close to validation point in TS layer.
- Keep model field typed `SafeResourceUrl` for embed URL.
- Add meaningful iframe `title` for accessibility.
