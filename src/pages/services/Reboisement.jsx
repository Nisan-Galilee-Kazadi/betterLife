import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import {
  FaTree,
  FaSeedling,
  FaLeaf,
  FaChartLine,
  FaUsers,
  FaHandsHelping,
} from "react-icons/fa";
import { GiPlantRoots, GiForest } from "react-icons/gi";
import { MdEco, MdNaturePeople } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";

export function ServiceReboisement() {
  const { t } = useLanguage();
  const nurseryIcons = [FaSeedling, GiPlantRoots, FaLeaf];
  const processIcons = [MdEco, FaSeedling, FaHandsHelping, FaChartLine];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#63b32e] to-[#0f70b7] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("services.reboisement.hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              {t("services.reboisement.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Introduction */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <SectionTitle
            kicker={t("services.reboisement.intro.kicker")}
            title={t("services.reboisement.intro.title")}
          >
            {t("services.reboisement.intro.text")}
          </SectionTitle>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
              <FaTree className="text-5xl text-[#63b32e] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#63b32e] mb-1">
                {t("services.reboisement.intro.stats.planted.number")}
              </p>
              <p className="text-sm text-slate-700">
                {t("services.reboisement.intro.stats.planted.label")}
              </p>
            </div>
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
              <FaChartLine className="text-5xl text-[#0f70b7] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#0f70b7] mb-1">
                {t("services.reboisement.intro.stats.survival.number")}
              </p>
              <p className="text-sm text-slate-700">
                {t("services.reboisement.intro.stats.survival.label")}
              </p>
            </div>
          </div>
        </div>

        {/* Nurseries */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("services.reboisement.nurseries.kicker")}
              title={t("services.reboisement.nurseries.title")}
            />
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {t("services.reboisement.nurseries.items").map((nursery, index) => {
              const Icon = nurseryIcons[index] || FaSeedling;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/20"
                >
                  <Icon className="text-5xl mb-4 text-[#63b32e]" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {nursery.name}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-[#0f70b7]">
                        {t("common.capacity")}:
                      </span>{" "}
                      {nursery.capacity}
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-[#0f70b7]">
                        {t("common.species")}:
                      </span>{" "}
                      {nursery.species}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {nursery.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#63b32e]" />
                        <span className="text-sm text-slate-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("services.reboisement.process.kicker")}
              title={t("services.reboisement.process.title")}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {t("services.reboisement.process.items").map((process, index) => {
              const Icon = processIcons[index] || MdEco;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#63b32e] to-[#0f70b7] mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {process.step}
                  </div>
                  <Icon className="text-4xl text-[#63b32e] mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-sm text-slate-600">{process.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl bg-green-50 border-2 border-green-200 p-8">
              <MdEco className="text-5xl text-[#63b32e] mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t("services.reboisement.benefits.env.title")}
              </h2>
              <ul className="space-y-4">
                {t("services.reboisement.benefits.env.items").map(
                  (benefit, index) => (
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
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="rounded-2xl bg-blue-50 border-2 border-blue-200 p-8">
              <FaUsers className="text-5xl text-[#0f70b7] mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t("services.reboisement.benefits.socio.title")}
              </h2>
              <ul className="space-y-4">
                {t("services.reboisement.benefits.socio.items").map(
                  (benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-[#0f70b7] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
          <GiForest className="text-7xl text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("services.reboisement.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("services.reboisement.cta.text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rejoindre"
              className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
            >
              {t("services.reboisement.cta.btn_join")}
            </Link>
            <Link
              to="/contact"
              className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              {t("services.reboisement.cta.btn_sponsor")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
