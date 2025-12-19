import { useEffect, useState, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaPlay,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";
import { FaSearch, FaGlobe } from "react-icons/fa";
import { SearchOverlay } from "./SearchOverlay";
import { Breadcrumb } from "./Breadcrumb";
import { useLanguage } from "../contexts/LanguageContext";
import logoOfficial from "../images/cropped-Logo-betterlife-officiel.png";
import logoWhite from "../images/Logo-betterlife-officiel-Blanc-300x300.png";

const socialLinks = [
  {
    icon: FaFacebook,
    href: "https://facebook.com/betterlife-ong",
    color: "bg-[#1877F2]",
  },
  { icon: FaXTwitter, href: "#", color: "bg-black" },
  { icon: FaLinkedin, href: "#", color: "bg-[#0077b5]" },
  {
    icon: FaYoutube,
    href: "https://youtube.com/@betterlife-ong",
    color: "bg-[#FF0000]",
  },
  { icon: FaInstagram, href: "#", color: "bg-[#E1306C]" },
  { icon: FaTiktok, href: "#", color: "bg-[#000000]" },
  { icon: FaWhatsapp, href: "#", color: "bg-[#25D366]" },
];

// Recursive NavItem Component
function NavItem({ item, depth = 0, isScrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const ref = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const hasChildren = item.children && item.children.length > 0;
  const isActive =
    location.pathname.startsWith(item.to) &&
    (item.to !== "/" || location.pathname === "/");

  // Base Text Colors & Styles
  let containerClass = "";
  let linkClass =
    "block whitespace-nowrap text-sm font-bold transition-colors duration-200";
  let iconClass = "transition-transform duration-200";

  if (depth === 0) {
    // Main Nav Item styling
    linkClass += "";

    const baseStyle =
      "flex items-center gap-0.5 px-4 py-2.5 rounded-md border-b-[3px] transition-all duration-200";

    if (isActive) {
      // Active State / Focus -> GREEN
      const activeClass = isScrolled
        ? "bg-[#63b32e]/10 border-[#63b32e] text-[#63b32e]"
        : "bg-[#63b32e]/10 border-[#63b32e] text-[#63b32e]";

      containerClass = `${baseStyle} ${activeClass}`;
    } else {
      // Inactive State
      const textColor = isScrolled ? "text-slate-700" : "text-white/90";

      // Hover -> BLUE
      const hoverClass = isScrolled
        ? "hover:bg-[#0f70b7]/10 hover:border-[#0f70b7] hover:text-[#0f70b7]"
        : "hover:bg-[#63b32e]/10 hover:border-[#63b32e] hover:text-[#63b32e]";

      containerClass = `${baseStyle} border-transparent ${textColor} ${hoverClass}`;
    }
  } else {
    // Dropdown Items
    containerClass =
      "flex items-center justify-between w-full px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#0f70b7]";
    linkClass += " w-full";
    if (isActive) {
      linkClass += " text-[#63b32e]";
    }
  }

  return (
    <div className="relative group" ref={ref}>
      <div className={containerClass}>
        <Link to={item.to} className={linkClass}>
          {item.name}
        </Link>

        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className={`p-1.5 ${iconClass} ${isOpen ? "rotate-90" : ""}`}
          >
            <FaPlay
              className={`${depth === 0 ? "h-2.5 w-2.5" : "h-2.5 w-2.5"}`}
            />
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div
          className={`absolute z-50 min-w-[220px] border border-slate-100 bg-white py-2 shadow-xl ring-1 ring-black/5 rounded-lg
            ${depth === 0
              ? "left-0 top-full mt-0 origin-top-left"
              : "left-full top-0 ml-1 origin-top-left"
            }`}
        >
          {item.children.map((child) => (
            <NavItem
              key={child.name}
              item={child}
              depth={depth + 1}
              isScrolled={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Mobile recursive nav item
function MobileNavItem({
  item,
  level = 0,
  setMobileOpen,
  openMobileItem,
  setOpenMobileItem,
  isScrolled,
}) {
  // Controlled by parent using per-level open state
  const id = `${item.to || item.name}-${level}`;
  const isOpen = (openMobileItem && openMobileItem[level]) === id;
  const hasChildren = item.children && item.children.length > 0;
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.to);

  return (
    <div
      className={`border-b last:border-0 ${isScrolled ? "border-gray-50" : "border-white/10"}`}
    >
      <div
        className="flex items-center justify-between py-3 pr-4"
        style={{ paddingLeft: `${level * 16 + 16}px` }}
      >
        <Link
          to={item.to}
          className={`text-base font-semibold ${
            isScrolled
              ? isActive
                ? "text-[#63b32e]"
                : "text-slate-800"
              : "text-white"
          }`}
          onClick={() => {
            if (!hasChildren) {
              setMobileOpen(false);
              if (setOpenMobileItem) setOpenMobileItem({});
            }
          }}
        >
          {item.name}
        </Link>
        {hasChildren && (
          <button
            onClick={() => {
              setOpenMobileItem((prev = {}) => {
                const current = prev[level];
                const next = { ...prev };
                if (current === id) {
                  // Close current
                  delete next[level];
                } else {
                  // Open this and clear deeper levels
                  next[level] = id;
                  Object.keys(next)
                    .map((k) => Number(k))
                    .filter((k) => k > level)
                    .forEach((k) => delete next[k]);
                }
                return next;
              });
            }}
            className={`p-2 transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            } ${
              isScrolled ? (isOpen ? "text-[#63b32e]" : "text-slate-400") : "text-white"
            }`}
            aria-expanded={isOpen}
            aria-controls={`submenu-${id}`}
          >
            <FaPlay className="h-3 w-3" />
          </button>
        )}
      </div>
      {hasChildren && (
        <div
          id={`submenu-${id}`}
          className={`${
            isScrolled ? "bg-slate-50" : "bg-white/10 backdrop-blur-md"
          } overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[2000px] opacity-100 py-2" : "max-h-0 opacity-0 py-0"
          }`}
          aria-hidden={!isOpen}
        >
          {item.children.map((child) => (
            <MobileNavItem
              key={child.name}
              item={child}
              level={level + 1}
              setMobileOpen={setMobileOpen}
              openMobileItem={openMobileItem}
              setOpenMobileItem={setOpenMobileItem}
              isScrolled={isScrolled}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Language Selector Component
function LanguageSelector({ isScrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const ref = useRef(null);

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code) => {
    setLanguage(code);
    // localStorage is handled in Context
    setIsOpen(false);
  };

  const currentLang =
    languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${isScrolled
          ? "text-slate-700 hover:bg-slate-100"
          : "text-white hover:bg-white/10"
          }`}
      >
        <span className="text-xl">{currentLang.flag}</span>
        <FaGlobe className="text-sm" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition ${language === lang.code
                ? "bg-green-50 text-[#63b32e]"
                : "text-slate-700"
                }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Shell({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [showTopBar, setShowTopBar] = useState(!isHome);
  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState({});
  const { t } = useLanguage();

  const navigation = [
    { name: t("nav.home"), to: "/" },
    {
      name: t("nav.about"),
      to: "/about",
      children: [
        { name: t("nav.team"), to: "/about/team" },
        { name: t("nav.partners"), to: "/about/partners" },
      ],
    },
    {
      name: t("nav.Actions"),
      to: "/Actions",
      children: [
        {
          name: t("nav.agriculture"),
          to: "/Actions/agriculture",
          children: [
            { name: t("nav.cacao"), to: "/Actions/agriculture/cacao" },
            { name: t("nav.cafe"), to: "/Actions/agriculture/cafe" },
            { name: t("nav.the"), to: "/Actions/agriculture/theier" },
            {
              name: t("nav.coton_caoutchouc"),
              to: "/Actions/agriculture/coton-caoutchouc",
            },
            {
              name: t("nav.arboriculture"),
              to: "/Actions/agriculture/arboriculture",
            },
            {
              name: t("nav.plantes_medicinales"),
              to: "/Actions/agriculture/plantes-medicinales",
            },
          ],
        },
        {
          name: t("nav.breeding"),
          to: "/Actions/elevage",
          children: [
            {
              name: t("nav.elevage_gros_betail"),
              to: "/Actions/elevage/gros-betail",
            },
            { name: t("nav.apiculture"), to: "/Actions/elevage/apiculture" },
            {
              name: t("nav.pisciculture"),
              to: "/Actions/elevage/pisciculture",
            },
            { name: t("nav.elevage_chiens"), to: "/Actions/elevage/chiens" },
            {
              name: t("nav.elevage_serpents"),
              to: "/Actions/elevage/serpents",
            },
          ],
        },
        {
          name: t("nav.projet_communautaire"),
          to: "/Actions/communautaire",
          children: [
            { name: t("nav.sante"), to: "/Actions/communautaire/sante" },
            { name: t("nav.energie"), to: "/Actions/communautaire/energie" },
            {
              name: t("nav.education"),
              to: "/Actions/communautaire/education",
            },
            {
              name: t("nav.route_desserte_agricole"),
              to: "/Actions/communautaire/routes-desserte",
            },
            {
              name: t("nav.habitation"),
              to: "/Actions/communautaire/habitation",
            },
          ],
        },
        {
          name: t("nav.mecanisation"),
          to: "/Actions/mecanisation",
          children: [
            { name: t("nav.tracteur"), to: "/Actions/mecanisation/tracteur" },
            {
              name: t("nav.accessoires"),
              to: "/Actions/mecanisation/accessoires",
            },
            {
              name: t("nav.autres"),
              to: "/Actions/mecanisation/autres",
            },
          ],
        },
        {
          name: t("nav.environement"),
          to: "/Actions/environement",
          children: [
            {
              name: t("nav.protection_foret"),
              to: "/Actions/environement/protection-foret",
            },
            {
              name: t("nav.credit_carbone"),
              to: "/Actions/environement/credit-carbone",
            },
            {
              name: t("nav.eco_kelasi"),
              to: "/Actions/environement/eco-kelasi",
            },
          ],
        },
      ],
    },
    {
      name: t("nav.media"),
      to: "/blog",
      children: [
        { name: t("nav.news"), to: "/blog/news" },
        { name: t("nav.gallery"), to: "/blog/gallery" },
      ],
    },
    { name: t("nav.emplois_stage"), to: "/rejoindre" },
    { name: t("nav.donation"), to: "/donation" },
    { name: t("nav.contact"), to: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const scrollingDown = current > lastScrollY && current > 0;

      if (isHome) {
        if (current < 20) {
          setShowTopBar(false);
          setIsScrolled(false);
        } else {
          setIsScrolled(true);
          if (scrollingDown) {
            setShowTopBar(false);
          } else if (current < lastScrollY - 2) {
            setShowTopBar(true);
          }
        }
      } else {
        setIsScrolled(true);
        if (current < 20) {
          setShowTopBar(true);
        } else if (scrollingDown) {
          setShowTopBar(false);
        } else if (current < lastScrollY - 2) {
          setShowTopBar(true);
        }
      }
      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHome]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
    if (location.pathname !== "/") {
      setShowTopBar(true);
      setIsScrolled(true);
    } else {
      setShowTopBar(false);
      setIsScrolled(false);
    }
  }, [location.pathname]);

  const headerBgClass = isScrolled
    ? "bg-white shadow-md text-slate-800"
    : "bg-transparent text-white";
  const logoSrc = isScrolled ? logoOfficial : logoWhite;

  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Top Bar */}
      <div
        className={`fixed top-0 z-40 w-full transition-transform duration-300 pb-[3px]  ${showTopBar ? "translate-y-0" : "-translate-y-full"
          }`}
        style={{ backgroundColor: "#63b32e" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs text-white lg:py-2 lg:text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold hidden sm:inline">
              {t("footer.location")}
            </span>
            <span className="hidden h-3 w-px bg-white/50 sm:block" />
            <span className="font-semibold">info@betterlife-ong.org</span>
          </div>

          {/* Social Icons (Reduced Size) */}
          <div className="hidden md:flex gap-1.5 transform scale-75">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`${social.color} p-1.5 rounded-md text-white hover:brightness-110 transition`}
              >
                <social.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>

          <div className="text-white/90 hidden lg:block italic font-semibold">
            {t("footer.tagline")}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header
        className={`fixed z-30 w-full transition-all duration-300 top-0  ${headerBgClass}`}
        style={{ top: showTopBar ? 28 : 0 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-0">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoSrc}
              alt="Better Life"
              className="h-16 w-auto transition-all duration-300 sm:h-24"
            />
          </Link>

          {/* Desktop Nav - Recursive */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} isScrolled={isScrolled} />
            ))}
          </nav>

          {/* Action / Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2.5 rounded-md transition ${isScrolled
                ? "text-slate-700 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
                }`}
              aria-label={t("common.search")}
            >
              <FaSearch className="text-lg" />
            </button>

            {/* Language Selector */}
            <LanguageSelector isScrolled={isScrolled} />

            <Link
              to="/rejoindre"
              className={`hidden rounded-md px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:brightness-110 lg:block ${isScrolled
                ? "bg-[#63b32e] text-white"
                : "bg-white text-[#63b32e] hover:bg-slate-100"
                }`}
            >
              {t("common.join")}
            </Link>

            <button
              className={`lg:hidden ${isScrolled ? "text-slate-800" : "text-white"
                }`}
              onClick={() =>
                setMobileOpen((prev) => {
                  const next = !prev;
                  if (prev === true) {
                    // closing menu -> clear open submenu state
                    setOpenMobileItem({});
                  }
                  return next;
                })
              }
            >
              <span className="sr-only">
                {mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              </span>
              <div className="relative h-5 w-6 gap-5">
                <span
                  className={`absolute left-0 block h-0.5 w-7 transition-all duration-300 ${mobileOpen ? "top-1/2 rotate-45" : "top-0 rotate-0"
                    } ${isScrolled ? "bg-[#0f70b7]" : "bg-white"}`}
                />
                <span
                  className={`absolute top-1/2 left-0 block h-0.5 w-5 transition-all duration-300 ${mobileOpen ? "opacity-0" : "opacity-100"
                    } ${isScrolled ? "bg-[#63b32e]" : "bg-white"}`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-7 transition-all duration-300 ${mobileOpen ? "top-1/2 -rotate-45" : "top-full rotate-0"
                    } ${isScrolled ? "bg-[#0f70b7]" : "bg-white"}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-full w-full overflow-hidden shadow-xl transition-all duration-300 lg:hidden ${mobileOpen
            ? "max-h-[85vh] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0"
            } ${isScrolled ? "bg-white" : "bg-white/10 backdrop-blur-md"}
            ${isScrolled ? "text-slate-800" : "text-white"}
                        }`}
        >
          <div
            className={`flex flex-col ${isScrolled ? "text-slate-800" : "text-white"
              }`}
          >
            {navigation.map((item) => (
              <MobileNavItem
                key={item.name}
                item={item}
                setMobileOpen={setMobileOpen}
                openMobileItem={openMobileItem}
                setOpenMobileItem={setOpenMobileItem}
                isScrolled={isScrolled}
              />
            ))}
            <div className="p-4">
              <Link
                to="/rejoindre"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-[#63b32e] py-3 text-center font-bold text-white shadow-sm"
              >
                {t("common.join")}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Breadcrumb - Only for submenus (depth > 1) */}
      {location.pathname.split("/").filter((x) => x).length > 1 && (
        <div className="hidden lg:block pt-[40px] lg:pt-[110px]">
          <Breadcrumb />
        </div>
      )}

      <main
        className={`flex-grow ${isHome
          ? "pt-0"
          : location.pathname.split("/").filter((x) => x).length > 1
            ? "pt-28 lg:pt-0"
            : "pt-24 lg:pt-28"
          }`}
      >
        {children}
      </main>

      <footer className="bg-[#0f70b7] pt-16 pb-0 text-white">
        {/* Footer content preserved */}
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logoWhite} alt="Better Life" className="h-16 w-auto" />
            </div>
            <p className="text-white/80 leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex flex-wrap gap-2 text-white">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 p-2 rounded-full hover:text-[#63b32e]  /20 transition"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.nav_title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/Actions"
                  className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4"
                >
                  {t("nav.Actions")}
                </Link>
              </li>
              <li>
                <Link
                  to="/rejoindre"
                  className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4"
                >
                  {t("nav.emplois_stage")}
                </Link>
              </li>
              {/* projets removed */}
              <li>
                <Link
                  to="/donation"
                  className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4"
                >
                  {t("nav.donation")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white/80 hover:underline decoration-[#63b32e] underline-offset-4"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          {/* Colonne Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#fafafa]">
              {t("footer.contact_title")}
            </h3>
            <ul className="space-y-3 text-white/80 w-full">
              <li className="flex flex-row item-center gap-3 w-full">
                <span className="font-semibold text-[12px] text-[#0f70b7] bg-white/70 w-50 h-50 rounded-full flex item-center p-2 absolute mt-2">
                  <FaLocationDot></FaLocationDot>
                </span>
                <span className="ml-10">
                  N°5 Av. Des Etangs, Q/ Joli Parc,
                  <br />C/ Ngaliema, Kinshasa - RDC
                </span>
              </li>
              <li className="flex gap-3 py-2">
                <span className="font-semibold text-[12px] text-[#0f70b7] bg-white/70 w-50 h-50 rounded-full flex item-center p-2">
                  <FaEnvelope></FaEnvelope>
                </span>
                <span className="pt-1">info@betterlife-ong.org</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[12px] text-[#0f70b7] bg-white/70 w-50 h-50 rounded-full flex item-center p-2">
                  <FaPhone></FaPhone>
                </span>
                <span className="pt-1">+243 82 9495 919</span>
              </li>
            </ul>
          </div>
          
          {/* Colonne Newsletter */}
          <div className="space-y-6">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#fafafa]">
              Newsletter
            </h3>
            <p className="text-white/80 text-sm">
              Restez informé de nos dernières actualités
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full px-4 py-2 h-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-[#0f70b7] h-12 font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-200"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
         {/* Google Maps */}
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-white uppercase mb-3">
                {t('contact.map.title')}
              </h2>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.4892345678!2d15.2666667!3d-4.3666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMjInMDAuMCJTIDE1wrAxNicwMC4wIkU!5e0!3m2!1sfr!2scd!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Better Life ONG Location"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 bg-black/10">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-white/60">
            <p className="text-[11px]">
              {new Date().getFullYear()} Better Life ONG. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
