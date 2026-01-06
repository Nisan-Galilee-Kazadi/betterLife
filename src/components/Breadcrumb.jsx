import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { t } = useLanguage();

  const pathLabels = {
    "": t("nav.home"),
    about: t("nav.about"),
    mission: t("nav.mission"),
    team: t("nav.team"),
    partners: t("nav.partners"),
    Actions: t("nav.Actions"),
    agriculture: t("nav.agriculture"),
    reboisement: t("nav.reboisement"),
    biodiversite: t("nav.biodiversity"),
    communautaire: t("nav.community"),
    elevage: t("nav.breeding"),
    apiculture: t("nav.apiculture"),
    Changement: t("nav.climate"),
    blog: t("nav.media"),
    news: t("nav.news"),
    gallery: t("nav.gallery"),
    contact: t("nav.contact"),
    rejoindre: t("common.join"),
    "emplois-stages": t("nav.emplois_stage"),
    emploi: t("career.form.job"),
    stage: t("career.form.internship"),
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-2">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-600 hover:text-[#63b32e] transition"
            >
              <FaHome className="text-base" />
              <span className="font-semibold">{t("nav.home")}</span>
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const label =
              pathLabels[name] || name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <li key={routeTo} className="flex items-center gap-2">
                <FaChevronRight className="text-slate-400 text-xs" />
                {isLast ? (
                  <span className="font-semibold text-[#0f70b7]">{label}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-slate-600 hover:text-[#63b32e] transition font-medium"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
