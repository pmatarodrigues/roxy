import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import rawCommunications from '../features/publications/communications.json';
import rawPublications from '../features/publications/publications.json';

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

const TYPE_LABELS: Record<Publication['type'], string> = {
  article: 'Artigo',
  'book-chapter': 'Capítulo de livro',
  opinion: 'Opinião',
};

@Component({
  selector: 'app-publications-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './publications-page.component.html',
  styleUrl: './publications-page.component.scss',
})
export class PublicationsPageComponent {
  protected readonly publications = rawPublications as Publication[];
  protected readonly communications = rawCommunications as Communications;

  protected getTypeLabel(type: Publication['type']): string {
    return TYPE_LABELS[type];
  }
}
