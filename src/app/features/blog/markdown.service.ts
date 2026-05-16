import { Injectable } from '@angular/core';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  public render(markdown: string): string {
    const rawHtml = marked.parse(markdown);
    return DOMPurify.sanitize(String(rawHtml));
  }
}
