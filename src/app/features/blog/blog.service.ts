import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { BlogIndex, BlogPost, BlogPostMeta, BlogPostWithAvailability } from './blog.model';

const BLOG_INDEX_URL = '/content/blog/index.json';

const sortByDateDesc = (posts: readonly BlogPostMeta[]): readonly BlogPostMeta[] =>
  [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);

  public getLatestPosts(
    limit: number,
    lang: 'en' | 'pt' = 'pt',
  ): Observable<readonly BlogPostWithAvailability[]> {
    return this.getAllPosts(lang).pipe(map((posts) => posts.slice(0, limit)));
  }

  public getAllPosts(lang: 'en' | 'pt' = 'pt'): Observable<readonly BlogPostWithAvailability[]> {
    return this.http.get<BlogIndex>(BLOG_INDEX_URL).pipe(
      map((index) => {
        const sorted = sortByDateDesc(index.posts ?? []);
        return sorted.map((post) => ({
          ...post,
          languages: post.languages ?? ['en'],
          availableInCurrentLang: (post.languages ?? ['en']).includes(lang),
        }));
      }),
      catchError(() => of([] as readonly BlogPostWithAvailability[])),
    );
  }

  public getPostBySlug(slug: string, lang: 'en' | 'pt' = 'pt'): Observable<BlogPost | null> {
    return this.getAllPosts(lang).pipe(
      map((posts) => posts.find((post) => post.slug === slug) ?? null),
      switchMap((postMeta) => {
        if (!postMeta) return of(null);

        const fetchLang = postMeta.availableInCurrentLang ? lang : (postMeta.languages[0] ?? 'en');
        const baseUrl = `/content/blog/${fetchLang}/${postMeta.slug}`;
        return this.http.get(`${baseUrl}/index.md`, { responseType: 'text' }).pipe(
          map((raw) => ({ ...postMeta, markdown: stripFrontmatter(raw), baseUrl })),
          catchError(() => of(null)),
        );
      }),
    );
  }
}

function stripFrontmatter(raw: string): string {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? raw.slice(match[0].length) : raw;
}
