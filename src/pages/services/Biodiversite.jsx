import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import { FaPaw, FaCamera, FaShieldAlt, FaMapMarkedAlt } from "react-icons/fa";
import {
  GiElephant,
  GiGorilla,
  GiButterfly,
  GiForest,
  GiSwamp,
} from "react-icons/gi";
import { MdNaturePeople, MdEco, MdScience } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";

export function ServiceBiodiversite() {
  const { t } = useLanguage();

  // Mapping icons for different sections
  const speciesIcons = {
    Gorilles: GiGorilla,
    Gorillas: GiGorilla,
    Bonobos: FaPaw,
    Okapis: FaPaw,
    Éléphants: GiElephant,
    Elephants: GiElephant,
  };

  // Fallback or ordered list if names don't match
  const speciesIconsList = [GiGorilla, FaPaw, FaPaw, GiElephant];
  const programIcons = [FaCamera, FaMapMarkedAlt, FaShieldAlt, MdScience];
  const ecosystemIcons = [GiForest, GiSwamp, MdNaturePeople];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f70b7] to-[#63b32e] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("services.biodiversite.hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              {t("services.biodiversite.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Introduction */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionTitle
            kicker={t("services.biodiversite.intro.kicker")}
            title={t("services.biodiversite.intro.title")}
          >
            {t("services.biodiversite.intro.text")}
          </SectionTitle>
        </div>

        {/* Key Species */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("services.biodiversite.species.kicker")}
              title={t("services.biodiversite.species.title")}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {t("services.biodiversite.species.items").map((species, index) => {
              const Icon = speciesIconsList[index] || FaPaw;
              const isGreen = index % 2 === 0;
              const colorClass = isGreen ? "text-[#63b32e]" : "text-[#0f70b7]";
              const bgClass = isGreen
                ? "border-green-200 bg-green-50"
                : "border-blue-200 bg-blue-50";

              return (
                <div
                  key={index}
                  className={`rounded-2xl border-2 ${bgClass} p-6 text-center`}
                >
                  <Icon className={`text-6xl mx-auto mb-4 ${colorClass}`} />
                  <h3 className="font-bold text-slate-900 mb-2">
                    {species.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-1">
                    Population: {species.pop}
                  </p>
                  <p className={`text-xs font-semibold ${colorClass}`}>
                    {species.status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conservation Programs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("services.biodiversite.programs.kicker")}
              title={t("services.biodiversite.programs.title")}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {t("services.biodiversite.programs.items").map((program, index) => {
              const Icon = programIcons[index] || FaCamera;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5"
                >
                  <Icon className="text-5xl mb-4 text-[#63b32e]" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-slate-600 mb-6">{program.desc}</p>
                  <ul className="space-y-2">
                    {program.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-[#63b32e] flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-slate-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ecosystems */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("services.biodiversite.ecosystems.kicker")}
              title={t("services.biodiversite.ecosystems.title")}
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {t("services.biodiversite.ecosystems.items").map(
              (ecosystem, index) => {
                const Icon = ecosystemIcons[index] || GiForest;
                return (
                  <div
                    key={index}
                    className="rounded-xl bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 p-6"
                  >
                    <Icon className="text-6xl text-[#63b32e] mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {ecosystem.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600">Surface</p>
                        <p className="text-lg font-bold text-[#0f70b7]">
                          {ecosystem.area}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Espèces</p>
                        <p className="text-lg font-bold text-[#0f70b7]">
                          {ecosystem.species}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {ecosystem.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#63b32e]" />
                          <span className="text-sm text-slate-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-20 rounded-2xl bg-gradient-to-br from-[#63b32e] to-[#0f70b7] p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Impact</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {t("services.biodiversite.ecosystems.stats").map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
          <MdEco className="text-7xl text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("services.biodiversite.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("services.biodiversite.cta.text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rejoindre"
              className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
            >
              {t("services.biodiversite.cta.btn_volunteer")}
            </Link>
            <Link
              to="/contact"
              className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              {t("services.biodiversite.cta.btn_support")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
