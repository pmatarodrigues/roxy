---
source: Context7 API
library: Marked + Angular
package: marked
topic: angular 21 browser markdown parsing to html security esm caveats
fetched: 2026-05-14T15:05:00Z
official_docs: https://marked.js.org/ and https://angular.dev/best-practices/security
---

## 1) Install command

```bash
npm install marked
```

## 2) Minimal browser usage API (markdown string -> html)

```ts
import { marked } from 'marked';

const md = '# Title\n\nHello **world**';
const html = marked.parse(md);
```

Angular component minimal:

```ts
import { Component } from '@angular/core';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown-demo',
  standalone: true,
  template: `<div [innerHTML]="html"></div>`,
})
export class MarkdownDemoComponent {
  html = marked.parse('# Marked in Angular\n\nRendered **HTML**');
}
```

## 3) Security guidance for rendering parsed html in Angular templates

Marked docs: output **not sanitized**. Sanitize untrusted markdown before binding to `[innerHTML]`.

Angular docs: `DomSanitizer` protects DOM contexts; bypass methods (`bypassSecurityTrustHtml`) are high risk, use only for fully trusted content.

Practical safe pattern (DOMPurify + Marked):

```ts
import { Component } from '@angular/core';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-markdown-safe',
  standalone: true,
  template: `<div [innerHTML]="safeHtml"></div>`,
})
export class MarkdownSafeComponent {
  private markdown = 'Hello <img src=x onerror=alert(1)> **safe**';
  safeHtml = DOMPurify.sanitize(marked.parse(this.markdown));
}
```

Hook once for global sanitization in Marked:

```ts
import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.use({
  hooks: {
    postprocess(html) {
      return DOMPurify.sanitize(html);
    },
  },
});
```

Do not do for untrusted input:

```ts
// Avoid unless content is fully trusted and controlled
// sanitizer.bypassSecurityTrustHtml(marked.parse(userMarkdown))
```

## 4) ESM/import caveats

- Browser ESM supported by Marked (`marked.esm.js` on CDN).
- Angular app code: use package import `import { marked } from 'marked'` (bundler handles ESM).
- `marked.parse()` returns HTML string; `[innerHTML]` binding required for render.
- If TypeScript strict complains on return type variants, cast when needed: `const html = String(marked.parse(md));`

Reference browser ESM from docs:

```html
<script type="module">
  import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';
  document.getElementById('content').innerHTML = marked.parse('# Hello');
</script>
```
