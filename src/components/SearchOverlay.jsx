import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { fr } from "../translations/fr";
import { en } from "../translations/en";
import { es } from "../translations/es";
import { sw } from "../translations/sw";

const translationsByCode = { fr, en, es, sw };

function flatten(obj, prefix = "") {
  const entries = [];
  Object.keys(obj || {}).forEach((key) => {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      entries.push({ key: fullKey, value });
    } else if (value && typeof value === "object") {
      entries.push(...flatten(value, fullKey));
    }
  });
  return entries;
}

function keyToRoute(key) {
  const rules = [
    { test: (k) => k.startsWith("home"), path: "/", section: "Home" },
    { test: (k) => k.startsWith("nav."), path: "/", section: "Navigation" },
    {
      test: (k) => k.startsWith("about.mission"),
      path: "/about/mission",
      section: "About",
    },
    {
      test: (k) => k.startsWith("about.team"),
      path: "/about/team",
      section: "About",
    },
    {
      test: (k) => k.startsWith("about.partners"),
      path: "/about/partners",
      section: "About",
    },
    {
      test: (k) => k.startsWith("Actions.agriculture"),
      path: "/Actions/agriculture",
      section: "Actions",
    },
    {
      test: (k) => k.startsWith("Actions.reboisement"),
      path: "/Actions/reboisement",
      section: "Actions",
    },
    {
      test: (k) => k.startsWith("Actions.biodiversite"),
      path: "/Actions/biodiversite",
      section: "Actions",
    },
    {
      test: (k) => k.startsWith("Actions.communautaire"),
      path: "/Actions/communautaire",
      section: "Actions",
    },
    {
      test: (k) => k.startsWith("Actions.elevage"),
      path: "/Actions/elevage",
      section: "Actions",
    },
    // Offres removed
    // Projets removed
    {
      test: (k) =>
        k.startsWith("blog") ||
        k.startsWith("nav.news") ||
        k.startsWith("nav.gallery"),
      path: "/blog",
      section: "Blog",
    },
    {
      test: (k) => k.startsWith("contact"),
      path: "/contact",
      section: "Contact",
    },
    { test: (k) => k.startsWith("footer"), path: "/", section: "Footer" },
  ];
  for (const rule of rules) {
    if (rule.test(key)) return { path: rule.path, section: rule.section };
  }
  return { path: "/", section: "Autre" };
}

function useSearchData() {
  return useMemo(() => {
    const allResults = [];
    const seen = new Set();

    Object.entries(translationsByCode).forEach(([lang, bundle]) => {
      const flat = flatten(bundle);
      flat.forEach(({ key, value }) => {
        if (!value || typeof value !== "string") return;

        const { path, section } = keyToRoute(key);
        // Create a unique identifier for the result to avoid too many duplicates
        // We group by path and normalized content
        const normalizedValue = value.toLowerCase().trim();
        const id = `${path}|${normalizedValue}`;

        if (!seen.has(id)) {
          allResults.push({
            key,
            title: value.length > 100 ? `${value.slice(0, 100)}…` : value,
            content: value,
            path,
            section,
            lang
          });
          seen.add(id);
        }
      });
    });
    return allResults;
  }, []);
}

export function SearchOverlay({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const { t } = useLanguage();
  const searchData = useSearchData();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.section.toLowerCase().includes(query)
    );

    // Sort results: exact matches or title matches first
    const sorted = [...filtered].sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(query);
      const bTitleMatch = b.title.toLowerCase().includes(query);
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });

    setResults(sorted.slice(0, 20)); // Limit to top 20 results for performance
  }, [searchQuery, searchData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Search Box */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center gap-4">
              <FaSearch className="text-2xl text-[#63b32e]" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("common.searchPlaceholder")}
                className="flex-1 text-xl text-slate-900 placeholder:text-slate-400 outline-none"
              />
              <button
                onClick={onClose}
                className="rounded-full p-2 transition hover:bg-slate-100"
              >
                <FaTimes className="text-xl text-slate-600" />
              </button>
            </div>

            {/* Results */}
            {searchQuery.trim().length >= 2 && (
              <div className="border-t border-slate-200 pt-4">
                {results.length > 0 ? (
                  <>
                    <p className="mb-4 text-sm text-slate-600">
                      {results.length} {t("common.resultsFound")}
                    </p>
                    <div className="max-h-96 space-y-3 overflow-y-auto">
                      {results.map((result, index) => (
                        <Link
                          key={index}
                          to={result.path}
                          onClick={onClose}
                          className="block rounded-lg border border-slate-200 p-4 transition hover:border-[#63b32e] hover:bg-green-50"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="mb-1 font-bold text-slate-900">
                              {result.title}
                            </h3>
                            <span className="text-xs font-semibold text-[#0f70b7]">
                              {result.section}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {result.content}
                          </p>
                          <p className="mt-2 text-xs text-[#0f70b7]">
                            {result.path}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="py-8 text-center text-slate-600">
                    {t("common.noResults")} "{searchQuery}"
                  </p>
                )}
              </div>
            )}

            {searchQuery.trim().length < 2 && (
              <div className="py-8 text-center text-slate-500">
                <p>{t("common.typeToSearch")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
