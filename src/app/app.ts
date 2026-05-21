import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { I18nService } from './features/i18n/i18n.service';
import { TranslatePipe } from './features/i18n/translate.pipe';

interface SectionLink {
  readonly id: string;
  readonly key: string;
}

const SECTION_LINKS: readonly SectionLink[] = [
  { id: 'hero', key: 'nav.intro' },
  { id: 'blog', key: 'nav.blog' },
  { id: 'side-projects', key: 'nav.interests' },
  { id: 'videos', key: 'nav.media' },
  { id: 'contact', key: 'nav.contact' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  protected readonly i18n = inject(I18nService);
  protected readonly sectionLinks = SECTION_LINKS;
  protected readonly currentYear = new Date().getFullYear();

  constructor() {
    inject(ViewportScroller).setOffset(() => {
      const header = document.querySelector('.site-header') as HTMLElement | null;
      return [0, (header?.offsetHeight ?? 64) + 8];
    });
  }

  protected lang(): 'en' | 'pt' {
    return this.i18n.lang();
  }

  protected langPath(targetLang: 'en' | 'pt'): string {
    const parts = this.router.url.split('/').filter(Boolean);
    parts[0] = targetLang;
    return '/' + parts.join('/');
  }
}
