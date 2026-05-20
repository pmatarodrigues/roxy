import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src', 'i18n');
const OUT_DIR = join(ROOT, 'public', 'i18n');

function parseYaml(text) {
  const result = {};
  let section = null;

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trimEnd();
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const nested = line.match(/^  ([^:]+):\s*(.*)$/);
    const top = line.match(/^([^:]+):\s*(.*)$/);

    if (nested && section) {
      const [, key, val] = nested;
      result[section][key.trim()] = parseScalar(val.trim());
    } else if (top && !line.startsWith(' ')) {
      const [, key, val] = top;
      const k = key.trim();
      if (!val.trim()) {
        result[k] = {};
        section = k;
      } else {
        result[k] = parseScalar(val.trim());
        section = null;
      }
    }
  }

  return result;
}

function parseScalar(val) {
  if (!val) return '';
  if ((val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  if (val === '>') return '';
  return val;
}

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
  const parsed = parseYaml(raw);
  const flat = flatten(parsed);
  writeFileSync(join(OUT_DIR, `${lang}.json`), JSON.stringify(flat, null, 2));
  console.log(`[generate-i18n] Wrote public/i18n/${lang}.json (${Object.keys(flat).length} keys)`);
}
