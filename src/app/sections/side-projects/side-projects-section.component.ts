import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { TranslatePipe } from '../../features/i18n/translate.pipe';

interface Postcard {
  readonly id: string;
  readonly imagePath: string;
  readonly altText: string;
}

function filenameToPostcard(filename: string, index: number): Postcard {
  return {
    id: `postcard-${index + 1}`,
    imagePath: `assets/postcards/${filename}`,
    altText: `Postal para cientistas ${index + 1}`,
  };
}

@Component({
  selector: 'app-side-projects-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './side-projects-section.component.html',
  styleUrl: './side-projects-section.component.scss',
})
export class SideProjectsSectionComponent {
  private readonly http = inject(HttpClient);

  protected readonly postcards = toSignal(
    this.http
      .get<string[]>('assets/postcards/manifest.json')
      .pipe(map(files => files.map(filenameToPostcard))),
    { initialValue: [] as Postcard[] },
  );
}
