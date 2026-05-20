import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '..', 'public', 'content', 'blog');
const LANGS = ['en', 'pt'];

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { meta: {}, body: raw };
  const meta = yaml.load(match[1]) ?? {};
  const body = raw.slice(match[0].length).trimStart();
  return { meta, body };
}

function firstH1(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

const postsBySlug = {};

for (const lang of LANGS) {
  const langDir = join(BLOG_DIR, lang);
  let entries;
  try {
    entries = readdirSync(langDir);
  } catch {
    continue;
  }

  for (const entry of entries) {
    const entryPath = join(langDir, entry);
    if (!statSync(entryPath).isDirectory()) continue;

    const mdPath = join(entryPath, 'index.md');
    let raw;
    try {
      raw = readFileSync(mdPath, 'utf8');
    } catch {
      continue;
    }

    const { meta, body } = parseFrontmatter(raw);
    if (meta.draft) continue;

    const slug = entry;
    const title = meta.title ?? firstH1(body) ?? slug;
    const cover = meta.cover ? `/content/blog/${lang}/${slug}/${meta.cover}` : undefined;

    if (!postsBySlug[slug]) postsBySlug[slug] = { slug, langs: [] };
    postsBySlug[slug].langs.push(lang);

    // EN is the canonical source for shared metadata (title, date, excerpt)
    if (lang === 'en' || !postsBySlug[slug].title) {
      postsBySlug[slug].title = title;
      postsBySlug[slug].date = meta.date instanceof Date
        ? meta.date.toISOString().slice(0, 10)
        : meta.date ? String(meta.date) : '';
      postsBySlug[slug].excerpt = meta.excerpt ?? '';
      if (cover) postsBySlug[slug].cover = cover;
    }
  }
}

const posts = Object.values(postsBySlug)
  .filter((p) => p.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map(({ slug, title, date, excerpt, cover, langs }) => ({
    slug,
    title,
    date,
    excerpt,
    ...(cover ? { cover } : {}),
    languages: langs,
  }));

mkdirSync(BLOG_DIR, { recursive: true });
writeFileSync(join(BLOG_DIR, 'index.json'), JSON.stringify({ posts }, null, 2) + '\n');
console.log(`[generate-blog-index] Wrote index.json (${posts.length} posts)`);
