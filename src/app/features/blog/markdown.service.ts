import { Injectable } from '@angular/core';
import DOMPurify from 'dompurify';
import { marked, Renderer } from 'marked';

const ALIGN_RE = /\|(left|right|center)$/i;

const renderer = new Renderer();
renderer.image = ({ href, text: rawAlt }) => {
  const match = rawAlt.match(ALIGN_RE);
  const align = match ? match[1].toLowerCase() : 'center';
  const alt = rawAlt.replace(ALIGN_RE, '').trim();
  return `<figure class="post-img post-img--${align}"><img src="${href}" alt="${alt}" loading="lazy" decoding="async" /></figure>`;
};

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  public render(markdown: string, baseUrl?: string): string {
    const rawHtml = marked.parse(markdown, { renderer });
    const sanitized = DOMPurify.sanitize(String(rawHtml), { ADD_TAGS: ['figure'] });
    return baseUrl ? rewriteRelativeImages(sanitized, baseUrl) : sanitized;
  }
}

function rewriteRelativeImages(html: string, baseUrl: string): string {
  return html.replace(
    /(<img\b[^>]*\bsrc=")(?!https?:\/\/|\/|data:)([^"]+)(")/gi,
    (_, pre, src, post) => `${pre}${baseUrl}/${src}${post}`,
  );
}
