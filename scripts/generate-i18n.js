import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src', 'i18n');
const OUT_DIR = join(ROOT, 'public', 'i18n');

function flatten(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flatten(value, fullKey));
    } else {
      acc[fullKey] = String(value).trim();
    }
    return acc;
  }, {});
}

mkdirSync(OUT_DIR, { recursive: true });

for (const lang of ['en', 'pt']) {
  const raw = readFileSync(join(SRC_DIR, `${lang}.yaml`), 'utf8');
  const parsed = yaml.load(raw);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`[generate-i18n] ${lang}.yaml must be a YAML mapping, got: ${typeof parsed}`);
  }
  const flat = flatten(parsed);
  writeFileSync(join(OUT_DIR, `${lang}.json`), JSON.stringify(flat, null, 2));
  console.log(`[generate-i18n] Wrote public/i18n/${lang}.json (${Object.keys(flat).length} keys)`);
}
