import { Component } from '@angular/core';

interface Postcard {
  readonly id: string;
  readonly imagePath: string;
  readonly altText: string;
}

const POSTCARDS: readonly Postcard[] = [
  {
    id: 'postcard-01',
    imagePath: 'assets/postcards/postcard-01.jpg',
    altText: 'Postal para cientistas 1',
  },
  {
    id: 'postcard-02',
    imagePath: 'assets/postcards/postcard-02.jpg',
    altText: 'Postal para cientistas 2',
  },
  {
    id: 'postcard-03',
    imagePath: 'assets/postcards/postcard-03.jpg',
    altText: 'Postal para cientistas 3',
  },
];

@Component({
  selector: 'app-side-projects-section',
  standalone: true,
  templateUrl: './side-projects-section.component.html',
  styleUrl: './side-projects-section.component.scss',
})
export class SideProjectsSectionComponent {
  protected readonly postcards = POSTCARDS;
}
