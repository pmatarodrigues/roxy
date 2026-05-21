import { Component } from '@angular/core';

interface StrengthEvidence {
  readonly role: string;
  readonly label: string;
  readonly fitStatement: string;
  readonly capabilities: readonly string[];
  readonly ctaText: string;
  readonly ctaHref: string;
  readonly accent: 'primary' | 'coral' | 'lavender';
}

const STRENGTH_EVIDENCE: readonly StrengthEvidence[] = [
  {
    role: 'Medical Writer',
    label: 'Role focus · foco da vaga',
    fitStatement:
      'Turns complex oncology evidence into structured narratives for clinicians, patients, and cross-functional teams.',
    capabilities: [
      'Two first-author publications and two first-author reviews in oncology and microfluidics',
      'Builds publication-ready figures and scientific visuals in Adobe Illustrator',
      'Translates methods, outcomes, and limitations into concise evidence summaries',
    ],
    ctaText: 'See writing samples · ver escrita',
    ctaHref: '#blog',
    accent: 'primary',
  },
  {
    role: 'Medical Science Liaison (MSL)',
    label: 'Role focus · foco da vaga',
    fitStatement:
      'Bridges research teams and clinical stakeholders with credible, field-ready scientific conversations.',
    capabilities: [
      'Led clinical sample workflows with oncology departments at IPO-Porto',
      'Presented data to multidisciplinary audiences at national and international conferences',
      'ICH Good Clinical Practice certified, with strong trial literacy and compliance awareness',
    ],
    ctaText: 'Open to MSL dialogue · conversar sobre MSL',
    ctaHref: '#contact',
    accent: 'coral',
  },

  {
    role: 'Science Communication',
    label: 'Role focus · foco da vaga',
    fitStatement:
      'Designs approachable science stories that keep rigor while increasing clarity and audience trust.',
    capabilities: [
      'Conference speaking experience across specialist and non-specialist contexts',
      'Story-led slide design and visual explanation workflows for complex topics',
      'Trilingual communication: Português, English, Deutsch (basic)',
    ],
    ctaText: 'Watch talks · ver apresentações',
    ctaHref: '#videos',
    accent: 'lavender',
  },
];

@Component({
  selector: 'app-role-fit-section',
  standalone: true,
  templateUrl: './role-fit-section.component.html',
  styleUrl: './role-fit-section.component.scss',
})
export class RoleFitSectionComponent {
  protected readonly strengthEvidence = STRENGTH_EVIDENCE;
}
