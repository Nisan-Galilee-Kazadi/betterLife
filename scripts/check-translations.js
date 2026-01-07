import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const translationsDir = path.resolve(process.cwd(), "src", "translations");
const srcDir = path.resolve(process.cwd(), "src");

async function loadTranslations() {
  const files = fs
    .readdirSync(translationsDir)
    .filter((f) => f.endsWith(".js"));
  const translations = {};
  for (const file of files) {
    const lang = path.basename(file, ".js");
    const fullPath = path.join(translationsDir, file);
    // dynamic import of ESM module
    const mod = await import(pathToFileURL(fullPath).href);
    translations[lang] = mod[lang];
  }
  return translations;
}

function flattenKeys(obj, prefix = "") {
  return flattenKeysWithValues(obj, prefix).map(p => p.k);
}

function flattenKeysWithValues(obj, prefix = "") {
  const entries = [];
  if (Array.isArray(obj)) {
    const base = prefix.replace(/^\./, "");
    // include the array path itself
    entries.push({ k: base, v: obj });
    // include indexed entries and recurse into each item
    for (let i = 0; i < obj.length; i++) {
      entries.push(...flattenKeysWithValues(obj[i], `${prefix}.${i}`));
    }
    return entries;
  }
  if (obj && typeof obj === "object") {
    for (const k of Object.keys(obj)) {
      const childPrefix = prefix ? `${prefix}.${k}` : k;
      entries.push(...flattenKeysWithValues(obj[k], childPrefix));
    }
    return entries;
  }
  return [{ k: prefix.replace(/^\./, ""), v: obj }];
}

function findUsageKeys(srcFolder) {
  const files = listFiles(srcFolder, [".jsx", ".js"]);
  const regex = /\bt\(\s*["'](.+?)["']\s*\)/g;
  const keys = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    let m;
    while ((m = regex.exec(content)) !== null) {
      keys.add(m[1]);
    }
  }
  return [...keys];
}

function listFiles(dir, extList) {
  const result = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      result.push(...listFiles(full, extList));
    } else if (extList.includes(path.extname(full))) {
      result.push(full);
    }
  }
  return result;
}

(async function main() {
  try {
    const translations = await loadTranslations();
    const flattenPerLang = {};
    for (const [lang, obj] of Object.entries(translations)) {
      flattenPerLang[lang] = new Set(flattenKeys(obj));
    }
    // Debugging: print counts and a few sample keys
    for (const [lang, s] of Object.entries(flattenPerLang)) {
      const arr = [...s];
      console.log(`lang=${lang} keys=${arr.length}, sample:`, arr.slice(0, 10));
    }
    console.log(
      "fr has projets.common.donate?",
      flattenPerLang["fr"].has("projets.common.donate")
    );
    console.log(
      "fr has contact.hero.title?",
      flattenPerLang["fr"].has("contact.hero.title")
    );
    const usedKeys = findUsageKeys(srcDir);
    const missingInLang = {}; // keys used in code but missing in file
    const missingParity = {}; // keys present in one file but missing in others
    const emptyValues = {}; // keys with empty string values

    const languages = Object.keys(flattenPerLang);
    const allKnownKeys = new Set([...usedKeys]);
    for (const langKeys of Object.values(flattenPerLang)) {
      for (const k of langKeys) allKnownKeys.add(k);
    }

    for (const key of allKnownKeys) {
      for (const lang of languages) {
        const hasKey = flattenPerLang[lang].has(key);
        const isUsedInCode = usedKeys.includes(key);

        if (!hasKey) {
          if (isUsedInCode) {
            missingInLang[lang] = missingInLang[lang] || [];
            missingInLang[lang].push(key);
          } else {
            missingParity[lang] = missingParity[lang] || [];
            missingParity[lang].push(key);
          }
        } else {
          // Key exists, check if value is empty
          const val = translations[lang];
          // We need the value from the original object to check if it's empty
          // Actually, let's look up the value in the flattened map we should have kept
        }
      }
    }

    // Let's refine the logic to be more robust
    const flatMaps = {};
    for (const [lang, obj] of Object.entries(translations)) {
      flatMaps[lang] = {};
      const pairs = flattenKeysWithValues(obj);
      for (const { k, v } of pairs) {
        flatMaps[lang][k] = v;
      }
    }

    const allKeysAcrossFiles = new Set();
    for (const lang of languages) {
      for (const k of Object.keys(flatMaps[lang])) {
        allKeysAcrossFiles.add(k);
      }
    }

    const report = {
      missingInCode: {}, // Used in code, missing in file
      missingParity: {}, // Present in some files, missing in others
      empty: {}          // Key exists but value is empty
    };

    for (const key of usedKeys) {
      for (const lang of languages) {
        if (!flatMaps[lang].hasOwnProperty(key)) {
          report.missingInCode[lang] = report.missingInCode[lang] || [];
          report.missingInCode[lang].push(key);
        }
      }
    }

    for (const key of allKeysAcrossFiles) {
      for (const lang of languages) {
        if (!flatMaps[lang].hasOwnProperty(key)) {
          report.missingParity[lang] = report.missingParity[lang] || [];
          report.missingParity[lang].push(key);
        } else if (typeof flatMaps[lang][key] === 'string' && flatMaps[lang][key].trim() === '') {
          report.empty[lang] = report.empty[lang] || [];
          report.empty[lang].push(key);
        }
      }
    }

    let hasErrors = false;

    if (Object.keys(report.missingInCode).length > 0) {
      console.log("\n[ERROR] Missing translation keys (Used in code but not in file):");
      for (const lang of Object.keys(report.missingInCode)) {
        console.log(`  ${lang}: ${report.missingInCode[lang].length} keys`);
        report.missingInCode[lang].forEach(k => console.log(`    - ${k}`));
      }
      hasErrors = true;
    }

    if (Object.keys(report.missingParity).length > 0) {
      console.log("\n[WARNING] Language parity issues (Defined in some files but missing in others):");
      for (const lang of Object.keys(report.missingParity)) {
        console.log(`  ${lang}: ${report.missingParity[lang].length} keys missing`);
        report.missingParity[lang].forEach(k => console.log(`    - ${k}`));
      }
      // Parity issues might just be warnings, but user wants to "debug" and "fix"
      // so I'll treat them as errors for now or just report them.
    }

    if (Object.keys(report.empty).length > 0) {
      console.log("\n[WARNING] Empty translation values:");
      for (const lang of Object.keys(report.empty)) {
        console.log(`  ${lang}: ${report.empty[lang].length} keys empty`);
        report.empty[lang].forEach(k => console.log(`    - ${k}`));
      }
    }

    if (!hasErrors && Object.keys(report.missingParity).length === 0 && Object.keys(report.empty).length === 0) {
      console.log("\nNo translation issues found. Everything is perfect!");
      process.exit(0);
    }

    process.exit(hasErrors ? 1 : 0);
  } catch (err) {
    console.error("Error running translation check:", err);
    process.exit(2);
  }
})();
