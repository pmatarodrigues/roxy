import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  protected getTypeLabel(type: Publication['type']): string {
    return TYPE_LABELS[type];
  }
}
