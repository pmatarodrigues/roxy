import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

import { BlogService } from '../../features/blog/blog.service';
import { I18nService } from '../../features/i18n/i18n.service';
import { TranslatePipe } from '../../features/i18n/translate.pipe';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './blog-section.component.html',
  styleUrl: './blog-section.component.scss',
})
export class BlogSectionComponent {
  private readonly blogService = inject(BlogService);
  protected readonly i18n = inject(I18nService);
  private readonly dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  private readonly editorialTags = [
    'Science communication · comunicação científica',
    'Oncology notes · notas de oncologia',
    'Field notes · notas de campo',
    'Life in science · vida na ciência',
  ];

  protected readonly newsletterHref =
    'mailto:adriana.carneiro.618@gmail.com?subject=subscribe%20me%20to%20your%20updates';

  protected readonly latestPosts = toSignal(
    toObservable(this.i18n.lang).pipe(
      switchMap((lang) => this.blogService.getLatestPosts(4, lang)),
    ),
    { initialValue: [] },
  );

  protected formatDate(date: string): string {
    return this.dateFormatter.format(new Date(date));
  }

  protected getEditorialTag(index: number): string {
    return this.editorialTags[index % this.editorialTags.length];
  }

  protected isTiltLeft(index: number): boolean {
    return index % 2 === 0;
  }

  protected isTiltRight(index: number): boolean {
    return !this.isTiltLeft(index);
  }

  protected unavailableBadgeKey(languages: readonly ('en' | 'pt')[]): string {
    return languages[0] === 'en' ? 'blog.only_in_en' : 'blog.only_in_pt';
  }
}
