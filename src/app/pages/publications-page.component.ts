import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import rawCommunications from '../features/publications/communications.json';
import rawPublications from '../features/publications/publications.json';
import { I18nService } from '../features/i18n/i18n.service';
import { TranslatePipe } from '../features/i18n/translate.pipe';

interface Publication {
  readonly id: string;
  readonly authors: string;
  readonly title: string;
  readonly journal: string;
  readonly year: number;
  readonly type: 'article' | 'book-chapter' | 'opinion';
  readonly url: string;
  readonly doi: string | null;
}

interface Communication {
  readonly id: string;
  readonly authors: string;
  readonly title: string;
  readonly date: string;
  readonly event: string;
  readonly location: string;
}

interface Communications {
  readonly oral: readonly Communication[];
  readonly poster: readonly Communication[];
}

const TYPE_LABEL_KEYS: Record<Publication['type'], string> = {
  article: 'publications.type_article',
  'book-chapter': 'publications.type_book_chapter',
  opinion: 'publications.type_opinion',
};

@Component({
  selector: 'app-publications-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './publications-page.component.html',
  styleUrl: './publications-page.component.scss',
})
export class PublicationsPageComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly publications = rawPublications as Publication[];
  protected readonly communications = rawCommunications as Communications;

  protected getTypeLabelKey(type: Publication['type']): string {
    return TYPE_LABEL_KEYS[type];
  }
}
