import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import {
  FaSeedling,
  FaTree,
  FaLeaf,
  FaTint,
  FaRecycle,
  FaChartLine,
} from "react-icons/fa";
import { GiFarmer, GiPlantRoots } from "react-icons/gi";
import { useLanguage } from "../../contexts/LanguageContext";

import imgCacao from "./agriculture/images/hero_cacao.webp";
import imgCafe from "./agriculture/images/hero_cafe.webp";
import imgThe from "./agriculture/images/hero_the.webp";
import imgCoton from "./agriculture/images/hero_coton_hevea.webp";
import imgArbo from "./agriculture/images/hero_arboriculture.webp";
import imgPlantes from "./agriculture/images/hero_plantes_medicinales.webp";
import hero_img from "../../images/hero_agriculture.webp";

export function ActionsAgriculture() {
  const { t } = useLanguage();
  const programIcons = [
    FaTree,
    FaLeaf,
    FaTint,
    FaSeedling,
    FaRecycle,
    GiPlantRoots,
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
        <img
          src={hero_img}
          alt="Agriculture"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
              {t("Actions.agriculture.hero.title")}
            </h1>
            <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
              {t("Actions.agriculture.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Introduction */}
        <div className="grid gap-12 lg:grid-cols-2 mb-20">
          <div className="space-y-6">
            <SectionTitle
              kicker={t("Actions.agriculture.intro.kicker")}
              title={t("Actions.agriculture.intro.title")}
            >
              {t("Actions.agriculture.intro.text")}
            </SectionTitle>
            <p className="text-lg text-slate-600">
              {t("Actions.agriculture.intro.subtext")}
            </p>
          </div>
          <div className="rounded-2xl bg-green-50 p-8 border-2 border-green-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {t("Actions.agriculture.intro.objectives.title")}
            </h3>
            <ul className="space-y-4">
              {t("Actions.agriculture.intro.objectives.items").map(
                (goal, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-[#63b32e] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-700">{goal}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Programs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("Actions.agriculture.programs.kicker")}
              title={t("Actions.agriculture.programs.title")}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {t("Actions.agriculture.programs.items").map((program, index) => {
              const images = [imgCacao, imgCafe, imgThe, imgCoton, imgArbo, imgPlantes];
              const links = [
                "/Actions/agriculture/cacao",
                "/Actions/agriculture/cafe",
                "/Actions/agriculture/theier",
                "/Actions/agriculture/coton-caoutchouc",
                "/Actions/agriculture/arboriculture",
                "/Actions/agriculture/plantes-medicinales"
              ];
              const img = images[index] || imgCacao;
              const link = links[index] || "#";

              return (
                <Link
                  to={link}
                  key={index}
                  className="group relative flex flex-col overflow-hidden rounded-2xl  bg-white shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-2xl hover:scale-[1.02]"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img src={img} alt={program.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#63b32e] transition">
                      {program.title}
                    </h3>
                    <p className="text-slate-600 mb-6 flex-1">{program.desc}</p>
                    <div className="space-y-2">
                      {program.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#63b32e]" />
                          <span className="text-sm text-slate-700">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Training & Support */}
        <div className="mb-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-[#63b32e] to-[#0f70b7] p-10 text-white">
              <h2 className="text-3xl font-bold mb-6">
                {t("Actions.agriculture.training.title")}
              </h2>
              <div className="space-y-6">
                {t("Actions.agriculture.training.items").map((item, index) => (
                  <div key={index} className="border-l-4 border-white/30 pl-4">
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">
                {t("Actions.agriculture.training.impact.title")}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {t("Actions.agriculture.training.impact.stats").map(
                  (stat, index) => (
                    <div
                      key={index}
                      className="rounded-xl border-2 border-green-100 bg-green-50 p-6 text-center"
                    >
                      <p className="text-3xl font-bold text-[#63b32e] mb-2">
                        {stat.number}
                      </p>
                      <p className="text-sm text-slate-700">{stat.label}</p>
                    </div>
                  )
                )}
              </div>
              <div className="rounded-xl bg-blue-50 border-2 border-blue-100 p-6">
                <h3 className="font-bold text-slate-900 mb-3">Témoignage</h3>
                <p className="text-slate-700 italic mb-3">
                  {t("Actions.agriculture.training.testimonial.text")}
                </p>
                <p className="text-sm font-semibold text-[#0f70b7]">
                  {t("Actions.agriculture.training.testimonial.author")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("Actions.agriculture.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("Actions.agriculture.cta.text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rejoindre"
              className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
            >
              {t("Actions.agriculture.cta.btn_train")}
            </Link>
            <Link
              to="/contact"
              className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              {t("Actions.agriculture.cta.btn_more")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
