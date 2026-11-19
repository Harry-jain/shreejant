import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.resolve(__dirname, '../src/i18n/locales');

const langs = ['en', 'hi', 'mr'];

function flatten(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flatten(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

let hasError = false;
const loaded = {};
const flat = {};

for (const lang of langs) {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] File missing: ${filePath}`);
    process.exit(1);
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    loaded[lang] = JSON.parse(raw);
    flat[lang] = flatten(loaded[lang]);
  } catch (err) {
    console.error(`[ERROR] Failed to parse ${lang}.json:`, err.message);
    process.exit(1);
  }
}

// 1. Check for empty values in all files
for (const lang of langs) {
  for (const [k, v] of Object.entries(flat[lang])) {
    if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
      console.error(`[ERROR] Language '${lang}' has empty value at key: ${k}`);
      hasError = true;
    }
  }
}

// 2. Compare keys against 'en'
const enKeys = new Set(Object.keys(flat.en));

for (const lang of langs) {
  if (lang === 'en') continue;
  const currentKeys = new Set(Object.keys(flat[lang]));

  // Missing keys in current lang
  for (const k of enKeys) {
    if (!currentKeys.has(k)) {
      console.error(`[ERROR] Key missing in '${lang}': ${k}`);
      hasError = true;
    }
  }

  // Extra keys in current lang
  for (const k of currentKeys) {
    if (!enKeys.has(k)) {
      console.error(`[ERROR] Extra key in '${lang}': ${k}`);
      hasError = true;
    }
  }
}

if (hasError) {
  console.error('\n❌ check-i18n: FAILED due to mismatched or empty keys.');
  process.exit(1);
} else {
  console.log(`✅ check-i18n: All ${enKeys.size} keys match across en, hi, mr with no empty values.`);
  process.exit(0);
}
