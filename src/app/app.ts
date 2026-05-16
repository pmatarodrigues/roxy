import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface SectionLink {
  readonly id: string;
  readonly label: string;
  readonly note: string;
}

const SECTION_LINKS: readonly SectionLink[] = [
  { id: 'hero', label: 'Introduction', note: 'Who I am' },
  { id: 'blog', label: 'Writing', note: 'Science • life • curiosity' },
  {
    id: 'side-projects',
    label: 'Interests',
    note: 'Projects • hobbies • creative practice',
  },
  { id: 'videos', label: 'Media', note: 'Talks • Visual explainers' },
  { id: 'journey', label: 'Journey', note: 'Learning path over time' },
  { id: 'contact', label: 'Contact', note: 'Open conversations' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly sectionLinks = SECTION_LINKS;
  protected readonly currentYear = new Date().getFullYear();
}
