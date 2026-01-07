import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import {
  FaRecycle,
  FaSolarPanel,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";
import { GiTrashCan, GiEarthAmerica } from "react-icons/gi";
import { MdSchool, MdNaturePeople } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";
import hero_img from "../../images/hero_reforestation.webp";

export function ActionsEnvironement() {
  const { t } = useLanguage();
  const programIcons = [GiTrashCan, FaSolarPanel, MdSchool];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
        <img
          src={hero_img}
          alt="Environnement"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
              {t("Actions.environement.hero.title")}
            </h1>
            <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
              {t("Actions.environement.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Introduction */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionTitle
            kicker={t("Actions.environement.intro.kicker")}
            title={t("Actions.environement.intro.title")}
          >
            {t("Actions.environement.intro.text")}
          </SectionTitle>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
              <GiEarthAmerica className="text-5xl text-[#63b32e] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#63b32e] mb-1">
                {t("Actions.environement.intro.stats.planted.number")}
              </p>
              <p className="text-sm text-slate-700">
                {t("Actions.environement.intro.stats.planted.label")}
              </p>
            </div>
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
              <MdNaturePeople className="text-5xl text-[#0f70b7] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#0f70b7] mb-1">
                {t("Actions.environement.intro.stats.survival.number")}
              </p>
              <p className="text-sm text-slate-700">
                {t("Actions.environement.intro.stats.survival.label")}
              </p>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("Actions.environement.programs.kicker")}
              title={t("Actions.environement.programs.title")}
            />
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {t("Actions.environement.programs.items").map((program, index) => {
              const Icon = programIcons[index] || FaRecycle;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/20"
                >
                  <Icon className="text-5xl mb-4 text-[#63b32e]" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-slate-600 mb-6">{program.desc}</p>
                  <div className="space-y-2">
                    {program.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#63b32e]" />
                        <span className="text-sm text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              {t("Actions.environement.impact.title")}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {t("Actions.environement.impact.stats").map((stat, index) => {
              return (
                <div key={index} className="text-center p-6 bg-slate-50 rounded-xl">
                  <p className="text-4xl font-bold text-[#0f70b7] mb-2">
                    {stat.number}
                  </p>
                  <p className="text-slate-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
          <FaLightbulb className="text-7xl text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("Actions.environement.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("Actions.environement.cta.text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rejoindre"
              className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
            >
              {t("Actions.environement.cta.btn_join")}
            </Link>
            <Link
              to="/contact"
              className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              {t("Actions.environement.cta.btn_sponsor")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
