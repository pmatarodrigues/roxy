import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  protected readonly email = 'adriana.carneiro.618@gmail.com';
  protected readonly linkedInUrl = 'https://www.linkedin.com/in/adrianafrcarneiro';
  protected readonly cvHref = '/assets/adriana-carneiro-cv.pdf';
  protected readonly mailtoHref = `mailto:${this.email}`;
}
