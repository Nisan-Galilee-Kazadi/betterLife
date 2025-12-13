import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { useLanguage } from "../contexts/LanguageContext";

export function Donation() {
  const { t } = useLanguage();
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#63b32e] to-[#0f70b7] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("donation.hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              {t("donation.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <SectionTitle
            kicker={t("donation.kicker")}
            title={t("donation.title")}
          />
          <p className="mt-4 text-lg text-slate-600">
            {t("donation.description")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border-2 border-green-100 bg-green-50 p-6 shadow-lg">
            <h3 className="font-bold text-slate-900 mb-2">
              {t("donation.support.title")}
            </h3>
            <p className="text-slate-700">{t("donation.support.text")}</p>
          </div>

          <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-6 shadow-lg">
            <h3 className="font-bold text-slate-900 mb-2">
              {t("donation.methods.title")}
            </h3>
            <p className="text-slate-700">{t("donation.methods.text")}</p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
            <h3 className="font-bold text-slate-900 mb-2">
              {t("donation.cta.title")}
            </h3>
            <p className="text-slate-700 mb-4">{t("donation.cta.text")}</p>
            <a
              href="/contact"
              className="rounded-md bg-[#63b32e] px-6 py-3 text-white font-semibold"
            >
              {t("donation.cta.btn")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
