export interface BlogPostMeta {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly excerpt: string;
  readonly cover?: string;
  readonly hero?: string;
  readonly languages: readonly ('en' | 'pt')[];
  readonly baseUrl?: string;
  readonly category?: string;
}

export interface BlogIndex {
  readonly posts: readonly BlogPostMeta[];
}

export interface BlogPost extends BlogPostMeta {
  readonly markdown: string;
}

export interface BlogPostWithAvailability extends BlogPostMeta {
  readonly availableInCurrentLang: boolean;
}
