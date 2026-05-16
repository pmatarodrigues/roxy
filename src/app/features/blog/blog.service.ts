import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { BlogIndex, BlogPost, BlogPostMeta } from './blog.model';

const BLOG_INDEX_URL = '/content/blog/index.json';

const sortByDateDesc = (posts: readonly BlogPostMeta[]): readonly BlogPostMeta[] =>
  [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);

  public getLatestPosts(limit: number): Observable<readonly BlogPostMeta[]> {
    return this.getAllPosts().pipe(map((posts) => posts.slice(0, limit)));
  }

  public getAllPosts(): Observable<readonly BlogPostMeta[]> {
    return this.http.get<BlogIndex>(BLOG_INDEX_URL).pipe(
      map((index) => sortByDateDesc(index.posts ?? [])),
      catchError(() => of([] as readonly BlogPostMeta[])),
    );
  }

  public getPostBySlug(slug: string): Observable<BlogPost | null> {
    return this.getAllPosts().pipe(
      map((posts) => posts.find((post) => post.slug === slug) ?? null),
      switchMap((postMeta) => {
        if (!postMeta) {
          return of(null);
        }

        return this.http.get(`/content/blog/${postMeta.slug}.md`, { responseType: 'text' }).pipe(
          map((markdown) => ({ ...postMeta, markdown })),
          catchError(() => of(null)),
        );
      }),
    );
  }
}
