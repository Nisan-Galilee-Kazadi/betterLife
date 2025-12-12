import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { fr } from "../translations/fr";
import { en } from "../translations/en";
import { es } from "../translations/es";

const LanguageContext = createContext();

const translations = {
  fr,
  en,
  es,
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "fr";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const getValueForLanguage = (lang, keys) => {
    let current = translations[lang];
    for (const key of keys) {
      if (current === undefined || current[key] === undefined) return undefined;
      current = current[key];
    }
    return current;
  };

  // Keep track of missing translations we've already warned about
  const warnedMissing = useRef(new Set());

  const t = (path) => {
    const keys = path.split(".");
    // Try current language first
    let value = getValueForLanguage(language, keys);
    if (value !== undefined) return value;

    // Fallback languages order
    const fallbackOrder = ["fr", "en"];
    for (const fallback of fallbackOrder) {
      if (fallback === language) continue;
      const fallbackValue = getValueForLanguage(fallback, keys);
      if (fallbackValue !== undefined) {
        // Warn only once per language:key to reduce console noise
        const warnKey = `${language}:${path}`;
        if (!warnedMissing.current.has(warnKey)) {
          console.warn(
            `Translation missing for key: ${path} in language: ${language}. Falling back to: ${fallback}`
          );
          warnedMissing.current.add(warnKey);
        }
        return fallbackValue;
      }
    }
    // Missing in all languages — warn once per key/language pair
    const warnKey = `${language}:${path}`;
    if (!warnedMissing.current.has(warnKey)) {
      console.warn(
        `Translation missing for key: ${path} in language: ${language}`
      );
      warnedMissing.current.add(warnKey);
    }
    return path; // Return key if translation is missing
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
