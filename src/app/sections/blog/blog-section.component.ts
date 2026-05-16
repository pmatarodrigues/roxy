import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlogService } from '../../features/blog/blog.service';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './blog-section.component.html',
  styleUrl: './blog-section.component.scss',
})
export class BlogSectionComponent {
  private readonly blogService = inject(BlogService);
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

  protected readonly latestPosts$ = this.blogService.getLatestPosts(4);

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
}
