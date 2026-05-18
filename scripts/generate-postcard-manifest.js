import { readdirSync, writeFileSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTCARDS_DIR = join(__dirname, '..', 'public', 'assets', 'postcards');
const MANIFEST_PATH = join(POSTCARDS_DIR, 'manifest.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const images = readdirSync(POSTCARDS_DIR)
  .filter(f => IMAGE_EXTENSIONS.has(extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

writeFileSync(MANIFEST_PATH, JSON.stringify(images, null, 2));
console.log(`Generated postcard manifest: ${images.length} image(s)`);
