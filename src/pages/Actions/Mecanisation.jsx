import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import { FaTractor, FaCogs, FaTools, FaIndustry } from "react-icons/fa";
import { GiFactory, GiGears, GiMechanicGarage, GiFarmTractor } from "react-icons/gi";
import { useLanguage } from "../../contexts/LanguageContext";
import hero_img from "../../images/agricultural-advertisement-banner-group-new-modern-generic-tractors-green-meadow-sunny-day-mixed.jpg";

export function ActionsMecanisation() {
  const { t } = useLanguage();

  const programIcons = [FaTractor, GiFactory, FaTools, FaCogs];
  const benefitIcons = [FaIndustry, GiGears, GiMechanicGarage, GiFarmTractor];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
        <img
          src={hero_img}
          alt="Mecanisation"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
              {t("Actions.mecanisation.hero.title")}
            </h1>
            <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
              {t("Actions.mecanisation.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Introduction */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionTitle
            kicker={t("Actions.mecanisation.intro.kicker")}
            title={t("Actions.mecanisation.intro.title")}
          >
            {t("Actions.mecanisation.intro.text")}
          </SectionTitle>
        </div>

        {/* Programs / Solutions */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("Actions.mecanisation.programs.kicker")}
              title={t("Actions.mecanisation.programs.title")}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {t("Actions.mecanisation.programs.items").map((program, index) => {
              const Icon = programIcons[index] || FaTractor;
              const links = [
                "/Actions/mecanisation/tracteur",
                "/Actions/mecanisation/accessoires", // Assuming "Unités de Transformation" maps largely to Accessories or a new page? Actually Accessoires matches "Accessoires" in nav. Let's map loosely to subpages for now.
                "/Actions/mecanisation/autres",
                "/Actions/mecanisation/autres" // Mapping Formation to Autres or keep static if no page exists.
              ];
              // Better mapping based on titles if possible, but index is safer with fixed list
              // 0: Tracteurs -> tracteur
              // 1: Unités -> accessoires (or generic)
              // 2: Maintenance -> autres
              // 3: Formation -> autres
              const link = links[index] || "/Actions/mecanisation/autres";

              return (
                <Link
                  to={link}
                  key={index}
                  className="block rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:translate-y-[-4px] hover:ring-[#63b32e]/20"
                >
                  <Icon className="text-5xl mb-4 text-[#63b32e]" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{program.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0f70b7] border-t pt-4 border-slate-100">
                    <FaIndustry />
                    <span>Impact: {program.impact}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">{t("Actions.mecanisation.benefits.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t("Actions.mecanisation.benefits.items").map((item, index) => {
              const Icon = benefitIcons[index] || GiGears;
              return (
                <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center text-center hover:border-[#63b32e] transition">
                  <Icon className="text-4xl text-[#0f70b7] mb-3" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
          <FaTractor className="text-7xl text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("Actions.mecanisation.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("Actions.mecanisation.cta.text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
            >
              {t("Actions.mecanisation.cta.btn_contact")}
            </Link>
            <Link
              to="/projets"
              className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              {t("Actions.mecanisation.cta.btn_more")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
