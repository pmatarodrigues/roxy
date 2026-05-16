import { Component } from '@angular/core';

interface SideProject {
  readonly title: string;
  readonly disciplineLabel: string;
  readonly summary: string;
  readonly impactLabel: string;
  readonly communicationSkill: string;
  readonly tilt: 'left' | 'right';
}

const SIDE_PROJECTS: readonly SideProject[] = [
  {
    title: 'Scientific illustration / ilustração científica',
    disciplineLabel: 'Disciplina / Craft · Illustration & Design',
    summary:
      'Creates scientific illustrations with Adobe Illustrator, translating complex biological processes into clear visual narratives para publicações e apresentações.',
    impactLabel: 'Impacto comunicacional / Transferable strength',
    communicationSkill:
      'Visual storytelling that makes data accessible para públicos técnicos e não técnicos.',
    tilt: 'left',
  },
  {
    title: 'Pint of Science Portugal',
    disciplineLabel: 'Disciplina / Craft · Event leadership',
    summary:
      'Vice-President of Pint of Science Guimarães (2022–2024), co-leading a local chapter do maior festival de ciência em bares across two editions.',
    impactLabel: 'Impacto comunicacional / Transferable strength',
    communicationSkill: 'Team coordination, sponsor relations e public engagement em escala.',
    tilt: 'right',
  },
  {
    title: 'Science outreach em escolas & hospitais',
    disciplineLabel: 'Disciplina / Craft · Public engagement',
    summary:
      'Delivers interactive sessions translating nanotechnology and oncology concepts para audiências de crianças, famílias e profissionais de saúde.',
    impactLabel: 'Impacto comunicacional / Transferable strength',
    communicationSkill: 'Adapting scientific storytelling para cada stakeholder e contexto.',
    tilt: 'left',
  },
];

@Component({
  selector: 'app-side-projects-section',
  standalone: true,
  templateUrl: './side-projects-section.component.html',
  styleUrl: './side-projects-section.component.scss',
})
export class SideProjectsSectionComponent {
  protected readonly projects = SIDE_PROJECTS;
}
