import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { fr } from "../translations/fr";
import { en } from "../translations/en";
import { es } from "../translations/es";
import { sw } from "../translations/sw.jsx";

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

// Function to remove accents from text
const removeAccents = (text) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ýÿ]/g, 'y')
    .replace(/[ç]/g, 'c')
    .replace(/[ñ]/g, 'n');
};

function useSearchData() {
  return useMemo(() => {
    const allResults = [];
    const seen = new Set();

    Object.entries(translationsByCode).forEach(([lang, bundle]) => {
      const flat = flatten(bundle);
      flat.forEach(({ key, value }) => {
        if (!value || typeof value !== "string") return;

        const { path, section } = keyToRoute(key);
        // Create a unique identifier for result to avoid too many duplicates
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

      // Add partner names to search results
      if (bundle.partners) {
        const partnerCategories = ['strategic', 'local', 'technical', 'private'];
        
        partnerCategories.forEach(category => {
          if (bundle.partners[category] && bundle.partners[category].items) {
            bundle.partners[category].items.forEach((partner, index) => {
              const partnerName = partner.name || partner;
              const partnerDesc = partner.desc || '';
              const partnerAcronym = partner.acronym || '';
              
              // Add partner name as searchable item
              const nameId = `/about/partners|${partnerName.toLowerCase().trim()}`;
              if (!seen.has(nameId) && partnerName) {
                allResults.push({
                  key: `partners.${category}.items[${index}].name`,
                  title: partnerName,
                  content: `${partnerName} - ${partnerDesc}`,
                  path: '/about/partners',
                  section: 'Partenaires',
                  lang
                });
                seen.add(nameId);
              }

              // Add partner acronym as searchable item
              if (partnerAcronym) {
                const acronymId = `/about/partners|${partnerAcronym.toLowerCase().trim()}`;
                if (!seen.has(acronymId)) {
                  allResults.push({
                    key: `partners.${category}.items[${index}].acronym`,
                    title: partnerAcronym,
                    content: `${partnerAcronym} - ${partnerName}`,
                    path: '/about/partners',
                    section: 'Partenaires',
                    lang
                  });
                  seen.add(acronymId);
                }
              }
            });
          }
        });
      }

      // Add real partner names from Partners.jsx data
      const realPartners = [
        // Haut-Katanga
        "MWAMBA SALIMA Marie-Claire", "MULUKA Gérard", "TSHILANDA Solange", "LUBAMBA WA LUBAMBA Alex",
        "ILUNGA NGOYI Teddy", "MUSAFIRI BUYA Beatrice", "MPINDA CIKALA", "MUYUMBA KIYANA Emmanuel",
        "MWADI KANYIKI Didine", "KABANGA LUBUYA Ina", "ODIA CIANI Auguy", "SELEMANI Gérard",
        "ILUNGU MWAMBA Alba", "KAKUDJIWA NKULU Jeanine", "TSHISWAKA NKUBA Alain", "KABAMBA Jephté",
        "KABONGU LWABA Bill", "MBUINGA DI NKUANGA Juslain", "KATOMBE MOLOWA Gustave", "MUKOLAYI JHON LAGODAS",
        "AMISI Oscar",
        // Kongo Central
        "KILOLA LUMBU", "LUPANGWA Jacques", "PAROISSE SAINT MICHEL KITIMA", "MAKOKO Ferdinand Abbé",
        "DIOCESE DE BOMA", "CALL IS BUSINESS SARL", "NZOLANI KUYADILUA Laurianne", "MUKOTSHI MONDO Blaise",
        "NDEMBE Jean-Claude", "KABANGU Pierre", "KUMBU MATONDO Joseph", "META MONIKA Adolphonie",
        "KAMBU MWAKA Edouard", "KAMBU KAMBU Joachim", "SARMA", "Abbé Aime NSUAMI",
        "MUKOLAYI John", "MABIALA NGIMBI Gina", "KHONDE NDUNDA Crispin",
        // Kinshasa
        "MONDONGA TIGOMBAY Fidel", "LUIBA LU NGIMBI Eugène", "FOMAPE", "KATOMBE MALOWA Gustave",
        "MABANGA PHUATI Joseph", "RA.JE.CO.PA", "MABOTI BOBO Jodi", "OTETE LOKADI DOUDOU Serge",
        "YENGA YENGA Raméal", "Paul et William", "LUKUSA Neville", "NZAU MAKAYA",
        "KOLELA Jean-Bertin", "DENDE SAMORA Vincent", "NTAMBWE MPOSHI Eliezer", "MBIYE Elie",
        "MUTOMBO Ruth", "MBUYI MPOYI STANIS Alain", "MUKOTSHI Blaise", "ACDECO",
        "MUKANYA SHABANTYA Raymond", "KALONDA KAPENGA Mamie", "NDEVU Emmanuel", "MOYOGO MOMBILI Michel",
        "MBUYA MBAYO Jean-Marie", "SOCIETE KBD",
        // Autres
        "MABAYA GIZI Jean-Philibert", "BOSUMBE MENDELA Fatou", "SINYEMBO NGUNGWA Christian",
        "MULUMBA Dorcas", "MBELU Claudine Esther", "KISHI KAJI Christelle", "MONSEIGNEUR SANGWA Jules",
        "MUSENGA TSHIEY Virginie"
      ];

      realPartners.forEach(partnerName => {
        const nameId = `/about/partners|${partnerName.toLowerCase().trim()}`;
        if (!seen.has(nameId)) {
          allResults.push({
            key: `real_partner_${partnerName.replace(/\s+/g, '_').toLowerCase()}`,
            title: partnerName,
            content: `Partenaire Better Life - ${partnerName}`,
            path: '/about/partners',
            section: 'Partenaires',
            lang
          });
          seen.add(nameId);
        }
      });

      // Add static content from pages
      const staticContent = [
        // Home page content
        { title: "Accueil", content: "Page d'accueil de Better Life", path: "/", section: "Accueil" },
        { title: "Protection Biodiversité", content: "Protection de la biodiversité et conservation des espèces", path: "/", section: "Accueil" },
        { title: "Sécurité Alimentaire", content: "Programmes de sécurité alimentaire et nutrition", path: "/", section: "Accueil" },
        { title: "Agriculture Durable", content: "Pratiques agricoles durables et modernes", path: "/", section: "Accueil" },
        { title: "Reboisement", content: "Programmes de reboisement et plantation d'arbres", path: "/", section: "Accueil" },
        { title: "Élevage", content: "Élevage durable et développement animal", path: "/", section: "Accueil" },
        { title: "Énergie Communautaire", content: "Projets d'énergie renouvelable pour les communautés", path: "/", section: "Accueil" },
        { title: "Reforestation", content: "Protection des forêts et reforestation", path: "/", section: "Accueil" },
        
        // About pages
        { title: "Mission", content: "Notre mission et vision pour un développement durable", path: "/about/mission", section: "À Propos" },
        { title: "Équipe", content: "Découvrez notre équipe dédiée au développement", path: "/about/team", section: "À Propos" },
        { title: "Partenaires", content: "Nos partenaires et collaborateurs", path: "/about/partners", section: "À Propos" },
        
        // Actions pages
        { title: "Agriculture", content: "Programmes agricoles et formation des agriculteurs", path: "/Actions/agriculture", section: "Actions" },
        { title: "Cacaoyer", content: "Culture du cacao Criollo de haute qualité", path: "/Actions/agriculture/cacao", section: "Actions" },
        { title: "bica", content: "Production de bica de spécialité", path: "/Actions/agriculture/cafe", section: "Actions" },
        { title: "Théier", content: "Culture du thé et transformation", path: "/Actions/agriculture/theier", section: "Actions" },
        { title: "Coton Caoutchouc", content: "Culture du coton et de l'hévéa", path: "/Actions/agriculture/coton-caoutchouc", section: "Actions" },
        { title: "Arboriculture", content: "Culture des arbres fruitiers et forestiers", path: "/Actions/agriculture/arboriculture", section: "Actions" },
        { title: "Plantes Médicinales", content: "Culture et valorisation des plantes médicinales", path: "/Actions/agriculture/plantes-medecinales", section: "Actions" },
        
        { title: "Reboisement", content: "Programmes de plantation d'arbres et reforestation", path: "/Actions/reboisement", section: "Actions" },
        { title: "Biodiversité", content: "Protection de la biodiversité et écosystèmes", path: "/Actions/biodiversite", section: "Actions" },
        { title: "Projet Communautaire", content: "Projets de développement communautaire", path: "/Actions/communautaire", section: "Actions" },
        { title: "Élevage", content: "Programmes d'élevage durable", path: "/Actions/elevage", section: "Actions" },
        { title: "Gros Bétail", content: "Élevage de bovins et grands animaux", path: "/Actions/elevage/gros-betail", section: "Actions" },
        { title: "Apiculture", content: "Élevage d'abeilles et production de miel", path: "/Actions/elevages/apiculture", section: "Actions" },
        { title: "Pisciculture", content: "Élevage de poissons et aquaculture", path: "/Actions/elevages/pisciculture", section: "Actions" },
        { title: "Chiens", content: "Élevage canin et formation", path: "/Actions/elevages/chiens", section: "Actions" },
        { title: "Serpents", content: "Élevage de serpents et production", path: "/Actions/elevages/serpents", section: "Actions" },
        
        { title: "Mécanisation", content: "Mécanisation agricole et équipements", path: "/Actions/mecanisation", section: "Actions" },
        { title: "Tracteur", content: "Services de tracteurs et mécanisation", path: "/Actions/mecanisation/tracteur", section: "Actions" },
        { title: "Accessoires", content: "Accessoires et équipements agricoles", path: "/Actions/mecanisation/accessoires", section: "Actions" },
        { title: "Autres Équipements", content: "Autres équipements et matériels agricoles", path: "/Actions/mecanisation/autres", section: "Actions" },
        
        { title: "Environnement", content: "Protection environnementale et climat", path: "/Actions/environement", section: "Actions" },
        { title: "Protection Forêt", content: "Protection des forêts et conservation", path: "/Actions/environement/protection-foret", section: "Actions" },
        { title: "Crédit Carbone", content: "Projets de crédit carbone et compensation", path: "/Actions/environement/credit-carbone", section: "Actions" },
        { title: "Eco Kelasi", content: "Programmes éducatifs environnementaux", path: "/Actions/environement/eco-kelasi", section: "Actions" },
        
        { title: "Éducation", content: "Programmes éducatifs et scolaires", path: "/Actions/communautaire/education", section: "Actions" },
        { title: "Énergie", content: "Projets d'énergie renouvelable", path: "/Actions/communautaire/energie", section: "Actions" },
        { title: "Habitation", content: "Programmes de logement et habitat", path: "/Actions/communautaire/habitation", section: "Actions" },
        { title: "Routes Desserte", content: "Développement des routes et infrastructures", path: "/Actions/communautaire/routes-desserte", section: "Actions" },
        { title: "Santé", content: "Programmes de santé et soins médicaux", path: "/Actions/communautaire/sante", section: "Actions" },
        
        // Other pages
        { title: "Blog", content: "Actualités et articles de blog", path: "/blog", section: "Blog" },
        { title: "Actualités", content: "Dernières actualités de Better Life", path: "/blog/news", section: "Blog" },
        { title: "Galerie", content: "Galerie photo de nos projets", path: "/blog/gallery", section: "Blog" },
        { title: "Contact", content: "Contactez Better Life", path: "/contact", section: "Contact" },
        { title: "Donation", content: "Faire un don à Better Life", path: "/donation", section: "Don" },
        { title: "Emploi Stage", content: "Opportunités d'emploi et stage", path: "/emploi-stage", section: "Carrière" },
        { title: "Rejoindre", content: "Rejoignez notre équipe", path: "/rejoindre", section: "Carrière" },
        { title: "Conditions", content: "Conditions d'utilisation", path: "/conditions", section: "Légal" }
      ];

      staticContent.forEach(item => {
        const contentId = `${item.path}|${item.title.toLowerCase().trim()}`;
        if (!seen.has(contentId)) {
          allResults.push({
            key: `static_${item.title.replace(/\s+/g, '_').toLowerCase()}`,
            title: item.title,
            content: item.content,
            path: item.path,
            section: item.section,
            lang
          });
          seen.add(contentId);
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
    const normalizedQuery = removeAccents(query);
    
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(
      (item) =>
        removeAccents(item.title.toLowerCase()).includes(normalizedQuery) ||
        removeAccents(item.content.toLowerCase()).includes(normalizedQuery) ||
        removeAccents(item.section.toLowerCase()).includes(normalizedQuery)
    );

    // Sort results: exact matches or title matches first
    const sorted = [...filtered].sort((a, b) => {
      const aTitleMatch = removeAccents(a.title.toLowerCase()).includes(normalizedQuery);
      const bTitleMatch = removeAccents(b.title.toLowerCase()).includes(normalizedQuery);
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
