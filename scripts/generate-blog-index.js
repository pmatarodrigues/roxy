import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '..', 'public', 'content', 'blog');
const LANGS = ['en', 'pt'];

function parseFrontmatterYaml(block) {
  const meta = {};
  for (const rawLine of block.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    meta[key] = parseScalar(val);
  }
  return meta;
}

function parseScalar(val) {
  if (!val) return '';
  if (val === 'true') return true;
  if (val === 'false') return false;
  if ((val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  return val;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { meta: {}, body: raw };
  const meta = parseFrontmatterYaml(match[1]);
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
    const base = `/content/blog/${lang}/${slug}`;
    const cover = meta.cover ? `${base}/${meta.cover}` : undefined;
    const hero = meta.hero ? `${base}/${meta.hero}` : undefined;
    const category = meta.category;

    if (!postsBySlug[slug]) postsBySlug[slug] = { slug, langs: [] };
    postsBySlug[slug].langs.push(lang);

    if (lang === 'en' || !postsBySlug[slug].title) {
      postsBySlug[slug].title = title;
      postsBySlug[slug].date = meta.date ? String(meta.date) : '';
      postsBySlug[slug].excerpt = meta.excerpt ?? '';
      if (cover) postsBySlug[slug].cover = cover;
      if (hero) postsBySlug[slug].hero = hero;
      if (category) postsBySlug[slug].category = category;
    }
  }
}

const posts = Object.values(postsBySlug)
  .filter((p) => p.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map(({ slug, title, date, excerpt, cover, hero, langs, category }) => ({
    slug,
    title,
    date,
    excerpt,
    ...(cover ? { cover } : {}),
    ...(hero ? { hero } : {}),
    languages: langs,
    category,
  }));

mkdirSync(BLOG_DIR, { recursive: true });
writeFileSync(join(BLOG_DIR, 'index.json'), JSON.stringify({ posts }, null, 2) + '\n');
console.log(`[generate-blog-index] Wrote index.json (${posts.length} posts)`);
