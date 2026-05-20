import { Component } from '@angular/core';

import { TranslatePipe } from '../../features/i18n/translate.pipe';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  protected readonly email = 'adriana.carneiro.618@gmail.com';
  protected readonly linkedInUrl = 'https://www.linkedin.com/in/adrianafrcarneiro';
  protected readonly cvHref = '/assets/adriana-carneiro-cv.pdf';
  protected readonly mailtoHref = `mailto:${this.email}`;
}
