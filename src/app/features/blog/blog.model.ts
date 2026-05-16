export interface BlogPostMeta {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly excerpt: string;
  readonly cover?: string;
}

export interface BlogIndex {
  readonly posts: readonly BlogPostMeta[];
}

export interface BlogPost extends BlogPostMeta {
  readonly markdown: string;
}
