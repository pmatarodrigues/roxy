import { Component } from '@angular/core';

interface TransitionMilestone {
  readonly stageLabel: string;
  readonly periodLabel: string;
  readonly dateTime: string;
  readonly title: string;
  readonly description: string;
  readonly pivotNote: string;
}

const TRANSITION_MILESTONES: readonly TransitionMilestone[] = [
  {
    stageLabel: 'Stage 01 · Fundação científica',
    periodLabel: '2016–2019',
    dateTime: '2016/2019',
    title: 'BSc roots in biology · base em biologia',
    description:
      'Built strong lab fundamentals in cell biology, molecular biology, and experimental design.',
    pivotNote: 'Aprendi a transformar perguntas complexas em hipóteses testáveis.',
  },
  {
    stageLabel: 'Stage 02 · Aplicação translacional',
    periodLabel: '2019–2021',
    dateTime: '2019/2021',
    title: "Master's translational focus · foco aplicado",
    description:
      'Connected bench experimentation to real biomedical decisions through translational projects and early microfluidics.',
    pivotNote: 'Do laboratório para contexto clínico: ciência com direção prática.',
  },
  {
    stageLabel: 'Stage 03 · Deep research',
    periodLabel: '2022–2026',
    dateTime: '2022/2026',
    title: 'PhD in oncology + microfluidics',
    description:
      'Led end-to-end R&D on a CTC platform, collaborating with clinicians and publishing evidence-driven outputs.',
    pivotNote: 'Rigour, data storytelling, and cross-functional dialogue became daily practice.',
  },
  {
    stageLabel: 'Stage 04 · Career pivot agora',
    periodLabel: 'Today · Hoje',
    dateTime: '2026',
    title: 'Medical communication transition · transição ativa',
    description:
      'I now package evidence into clear narratives via writing, talks, and visual communication for broader healthcare impact.',
    pivotNote:
      'Target roles: Medical Writer, MSL, and Science Communicator — mesma base científica, novo alcance.',
  },
];

@Component({
  selector: 'app-transition-section',
  standalone: true,
  templateUrl: './transition-section.component.html',
  styleUrl: './transition-section.component.scss',
})
export class TransitionSectionComponent {
  protected readonly milestones = TRANSITION_MILESTONES;
}
