import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { BlogPost } from '../features/blog/blog.model';
import { BlogService } from '../features/blog/blog.service';
import { MarkdownService } from '../features/blog/markdown.service';
import { I18nService } from '../features/i18n/i18n.service';
import { TranslatePipe } from '../features/i18n/translate.pipe';

interface BlogPostViewModel extends BlogPost {
  readonly html: string;
}

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink, TranslatePipe],
  templateUrl: './blog-post-page.component.html',
  styleUrl: './blog-post-page.component.scss',
})
export class BlogPostPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);
  private readonly markdownService = inject(MarkdownService);
  protected readonly i18n = inject(I18nService);
  private readonly dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  protected readonly post$ = this.route.paramMap.pipe(
    map((params) => params.get('slug') ?? ''),
    switchMap((slug) => this.blogService.getPostBySlug(slug, this.i18n.lang())),
    map((post) => {
      if (!post) {
        return null;
      }

      return {
        ...post,
        html: this.markdownService.render(post.markdown, post.baseUrl),
      } as BlogPostViewModel;
    }),
  );

  protected formatDate(date: string): string {
    return this.dateFormatter.format(new Date(date));
  }
}
