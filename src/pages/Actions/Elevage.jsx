import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import { FaChartLine, FaUsers, FaHeart, FaShieldAlt } from "react-icons/fa";
import {
  GiFarmer,
  GiChicken,
  GiCow,
  GiPig,
  GiBeehive,
  GiFishEggs,
  GiSnake,
  GiDogBowl
} from "react-icons/gi";
import { MdHealthAndSafety, MdScience } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";
import elevage_hero from "../../images/wide-angle-portrait-beautiful-healthy-cows-row-eating-hay-cowshed-organic-dairy-farm-copy-space.webp";

export function ActionsElevage() {
  const { t } = useLanguage();

  const livestockIcons = [
    GiDogBowl,    // Pour l'élevage de chiens
    GiSnake,      // Pour l'élevage de serpents
    GiCow,        // Gros bétail
    GiBeehive,    // Apiculture
    GiFishEggs,    // Pisciculture
  ];
  const serviceIcons = [MdHealthAndSafety, MdScience, GiFarmer, FaShieldAlt];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
        <img
          src={elevage_hero}
          alt="Elevage"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
              {t("Actions.elevage.hero.title")}
            </h1>
            <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
              {t("Actions.elevage.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Introduction */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionTitle
            kicker={t("Actions.elevage.intro.kicker")}
            title={t("Actions.elevage.intro.title")}
          >
            {t("Actions.elevage.intro.text")}
          </SectionTitle>
        </div>

        {/* Livestock Types */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("Actions.elevage.types.kicker")}
              title={t("Actions.elevage.types.title")}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {(t("Actions.elevage.types.items", { returnObjects: true }) || []).map((type, index) => {
              if (!type) return null;
              const Icon = livestockIcons[index] || GiChicken;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/20"
                >
                  <Icon className="text-6xl mb-4 text-[#63b32e]" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {type.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{type.desc}</p>
                  <p className="text-sm font-semibold text-[#0f70b7]">
                    {t("common.capacity")}: {type.production}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("Actions.elevage.Actions.kicker")}
              title={t("Actions.elevage.Actions.title")}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {(t("Actions.elevage.Actions.items", { returnObjects: true }) || []).map((service, index) => {
              // Safety check if service is not an object or features is missing
              if (!service || !service.features) return null;

              const Icon = serviceIcons[index] || MdHealthAndSafety;
              return (
                <div
                  key={index}
                  className="rounded-xl border-2 border-green-200 bg-green-50 p-8"
                >
                  <Icon className="text-5xl text-[#63b32e] mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
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
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Story */}
        <div className="mb-20">
          <div className="rounded-3xl bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 p-12">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <span className="px-4 py-2 bg-[#63b32e] text-white rounded-full text-sm font-semibold">
                  {t("Actions.elevage.story.tag")}
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mt-6 mb-6">
                  {t("Actions.elevage.story.title")}
                </h2>
                <p className="text-lg text-slate-700 mb-6">
                  {t("Actions.elevage.story.text")}
                </p>
                <div className="space-y-4">
                  {t("Actions.elevage.story.benefits").map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6 text-[#63b32e]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {(t("Actions.elevage.story.stats", { returnObjects: true }) || []).map((stat, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border-2 ${stat.color === "green"
                      ? "border-green-200 bg-green-50"
                      : "border-blue-200 bg-blue-50"
                      } p-6 text-center`}
                  >
                    <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                    <p
                      className={`text-3xl font-bold ${stat.color === "green"
                        ? "text-[#63b32e]"
                        : "text-[#0f70b7]"
                        }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-20 rounded-2xl bg-gradient-to-br from-[#63b32e] to-[#0f70b7] p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("Actions.elevage.stats.title")}
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            {(t("Actions.elevage.stats.items", { returnObjects: true }) || []).map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
          <FaHeart className="text-7xl text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("Actions.elevage.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("Actions.elevage.cta.text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rejoindre"
              className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
            >
              {t("Actions.elevage.cta.btn_join")}
            </Link>
            <Link
              to="/contact"
              className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              {t("Actions.elevage.cta.btn_partner")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
