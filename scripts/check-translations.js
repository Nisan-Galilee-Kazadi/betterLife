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
  const keys = [];
  if (Array.isArray(obj)) {
    const base = prefix.replace(/^\./, "");
    // include the array path itself
    keys.push(base);
    // include indexed entries and recurse into each item
    for (let i = 0; i < obj.length; i++) {
      keys.push(`${base}.${i}`);
      keys.push(...flattenKeys(obj[i], `${prefix}.${i}`));
    }
    return keys;
  }
  if (obj && typeof obj === "object") {
    for (const k of Object.keys(obj)) {
      const childPrefix = prefix ? `${prefix}.${k}` : k;
      keys.push(...flattenKeys(obj[k], childPrefix));
    }
    return keys;
  }
  return [prefix.replace(/^\./, "")];
}

function findUsageKeys(srcFolder) {
  const files = listFiles(srcFolder, [".jsx", ".js"]);
  const regex = /t\(\s*["'](.+?)["']\s*\)/g;
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
    const missing = {};
    for (const key of usedKeys) {
      for (const lang of Object.keys(flattenPerLang)) {
        if (!flattenPerLang[lang].has(key)) {
          missing[lang] = missing[lang] || [];
          missing[lang].push(key);
        }
      }
    }

    if (Object.keys(missing).length === 0) {
      console.log("No missing translation keys — good.");
      process.exit(0);
    }

    console.log("Missing translation keys per language:");
    for (const lang of Object.keys(missing)) {
      console.log(`\n== ${lang} (${missing[lang].length}) ==`);
      console.log(missing[lang].join("\n"));
    }
    process.exit(1);
  } catch (err) {
    console.error("Error running translation check:", err);
    process.exit(2);
  }
})();
