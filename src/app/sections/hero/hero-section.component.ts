import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface HeroNote {
  readonly label: string;
  readonly title: string;
  readonly summary: string;
}

interface FocusTag {
  readonly text: string;
}

const HERO_NOTES: readonly HeroNote[] = [
  {
    label: 'Science notes',
    title: 'Da bancada para histórias legíveis',
    summary:
      'Escrevo para transformar temas de oncologia e laboratório em ideias que pessoas reais consigam usar.',
  },
  {
    label: 'Voice / Voz',
    title: 'Ciência complexa, linguagem clara',
    summary:
      'Gosto de juntar rigor com calor humano: dados certos, frases simples, impacto real.',
  },
  {
    label: 'Curiosity',
    title: 'Portugal · Barcelona · Leiden',
    summary:
      'As minhas experiências internacionais moldaram a forma como observo ciência, cultura e comunicação.',
  },
];

const FOCUS_TAGS: readonly FocusTag[] = [
  { text: 'oncology + storytelling' },
  { text: 'writing in public, learning in public' },
  { text: 'science, ideas, and everyday curiosity' },
];

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  protected readonly heroNotes = HERO_NOTES;
  protected readonly focusTags = FOCUS_TAGS;
}
