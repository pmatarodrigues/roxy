import { Injectable } from '@angular/core';
import DOMPurify from 'dompurify';
import { marked, Renderer } from 'marked';

// ++text++ → amber marker/highlighter
const markerExtension = {
  name: 'marker',
  level: 'inline' as const,
  start: (src: string) => src.indexOf('++'),
  tokenizer(src: string) {
    const match = src.match(/^\+\+([^+]+)\+\+/);
    if (match) return { type: 'marker', raw: match[0], text: match[1] };
    return undefined;
  },
  renderer: (token: { text: string }) => `<u>${token.text}</u>`,
};

// ~text~ → strikethrough
const strikeExtension = {
  name: 'strike',
  level: 'inline' as const,
  start: (src: string) => src.indexOf('~'),
  tokenizer(src: string) {
    const match = src.match(/^~([^~]+)~/);
    if (match) return { type: 'strike', raw: match[0], text: match[1] };
    return undefined;
  },
  renderer: (token: { text: string }) => `<del>${token.text}</del>`,
};

// ==text== → colorful gradient underline
const colorUnderlineExtension = {
  name: 'colorUnderline',
  level: 'inline' as const,
  start: (src: string) => src.indexOf('=='),
  tokenizer(src: string) {
    const match = src.match(/^==([^=]+)==/);
    if (match) return { type: 'colorUnderline', raw: match[0], text: match[1] };
    return undefined;
  },
  renderer: (token: { text: string }) => `<span class="post-underline">${token.text}</span>`,
};

marked.use({ extensions: [markerExtension, strikeExtension, colorUnderlineExtension] });

const ALIGN_RE = /\|(left|right|center)$/i;

const WAVE_SVG = `<div class="post-divider" aria-hidden="true"><svg viewBox="0 0 160 20" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M0 10 Q20 0 40 10 Q60 20 80 10 Q100 0 120 10 Q140 20 160 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>`;

const renderer = new Renderer();

renderer.image = ({ href, text: rawAlt }) => {
  const match = rawAlt.match(ALIGN_RE);
  const align = match ? match[1].toLowerCase() : 'center';
  const alt = rawAlt.replace(ALIGN_RE, '').trim();
  const caption = alt ? `<figcaption>${alt}</figcaption>` : '';
  return `<figure class="post-img post-img--${align}"><img src="${href}" alt="${alt}" loading="lazy" decoding="async" />${caption}</figure>`;
};

renderer.hr = () => WAVE_SVG;

renderer.heading = ({ text, depth }) => {
  const isReferences = /^references/i.test(text.trim());
  const cls = isReferences ? ' class="post-references"' : '';
  return `<h${depth}${cls}>${text}</h${depth}>`;
};

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  public render(markdown: string, baseUrl?: string): string {
    const rawHtml = marked.parse(markdown, { renderer });
    const sanitized = DOMPurify.sanitize(String(rawHtml), {
      ADD_TAGS: ['figure', 'figcaption'],
      ADD_ATTR: ['class'],
    });
    return baseUrl ? rewriteRelativeImages(sanitized, baseUrl) : sanitized;
  }
}

function rewriteRelativeImages(html: string, baseUrl: string): string {
  return html.replace(
    /(<img\b[^>]*\bsrc=")(?!https?:\/\/|\/|data:)([^"]+)(")/gi,
    (_, pre, src, post) => `${pre}${baseUrl}/${src}${post}`,
  );
}
