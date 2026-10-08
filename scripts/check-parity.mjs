import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'messages');
const files = ['en.json', 'pt.json', 'zh.json'];

function collect(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      out[key] = { type: 'array', len: v.length, items: v.map(String) };
    } else if (v && typeof v === 'object') {
      collect(v, key, out);
    } else {
      out[key] = { type: 'leaf' };
    }
  }
  return out;
}

const base = JSON.parse(fs.readFileSync(path.join(dir, files[0]), 'utf8'));
const baseKeys = collect(base);
let ok = true;

for (const file of files.slice(1)) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const keys = collect(data);
  const baseOnly = Object.keys(baseKeys).filter((k) => !(k in keys));
  const extra = Object.keys(keys).filter((k) => !(k in baseKeys));
  const arrayMismatch = Object.keys(baseKeys)
    .filter((k) => baseKeys[k].type === 'array')
    .filter((k) => keys[k]?.type !== 'array' || keys[k].len !== baseKeys[k].len);
  if (baseOnly.length || extra.length || arrayMismatch.length) {
    ok = false;
    console.log('MISMATCH', file, {
      baseOnly,
      extra,
      arrayMismatch,
    });
  } else {
    console.log('PASS', file, Object.keys(keys).length, 'keys');
  }
}

// New entity keys present in every language
for (const file of files) {
  const d = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const checks = {
    'hero.title': d.hero.title,
    'hero.imgAlt': d.hero.imgAlt,
    'hero.reviewCount': d.hero.reviewCount,
    'intro.surroundings': d.intro.surroundings,
    'intro.breadcrumb.length': d.intro.breadcrumb.length,
    'mapSection.officialText': d.mapSection.officialText,
    'mapSection.officialLink': d.mapSection.officialLink,
    'footer.photoCredit': d.footer.photoCredit,
    'sourcesSection.title': d.sourcesSection.title,
  };
  const missing = Object.entries(checks).filter(([, v]) => v === undefined || v === null);
  if (missing.length) {
    ok = false;
    console.log('MISSING KEYS', file, missing.map(([k]) => k));
  } else {
    console.log('ENTITY KEYS OK', file, JSON.stringify(checks));
  }
}

console.log(ok ? 'ALL PASS' : 'FAIL');
process.exit(ok ? 0 : 1);
