import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaHeartbeat, FaMortarPestle, FaLeaf, FaSun } from "react-icons/fa";
import { GiMedicinePills, GiHealthPotion } from "react-icons/gi";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function PlantesMedicinales() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#00897b] to-[#4db6ac] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t("Actions.agricultures.plantes_medicinales.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
                            {t("Actions.agricultures.plantes_medicinales.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Intro */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker={t("Actions.agricultures.plantes_medicinales.intro.kicker")}
                        title={t("Actions.agricultures.plantes_medicinales.intro.title")}
                    >
                        {t("Actions.agricultures.plantes_medicinales.intro.text")}
                    </SectionTitle>
                </div>

                {/* Feature/Species Cards */}
                <div className="grid gap-6 md:grid-cols-2 mb-20">
                    {t("Actions.agricultures.plantes_medicinales.features.items").map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-6 rounded-xl bg-teal-50 border border-teal-100 hover:border-teal-300 transition">
                            <div className="p-3 bg-white rounded-full shadow-sm text-[#00897b]">
                                <FaLeaf />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">{item}</h4>
                                <p className="text-sm text-slate-500 mt-1">Propriétés thérapeutiques reconnues</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Transformation Process */}
                <div className="mb-20">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-slate-900">{t("Actions.agricultures.plantes_medicinales.technique.title")}</h3>
                    </div>
                    <div className="relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-teal-100 -z-10 -translate-y-1/2"></div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {t("Actions.agricultures.plantes_medicinales.technique.items").map((item, idx) => {
                                const icons = [FaSun, FaMortarPestle, GiHealthPotion]; // Imported FaSun implicitly or fallback
                                // To fix import issue, let's use GiHerbalEnema as generic if FaSun missing or use generic mapping
                                const Icon = [FaLeaf, FaMortarPestle, GiMedicinePills][idx % 3];

                                return (
                                    <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg text-center">
                                        <Icon className="mx-auto text-4xl text-[#00897b] mb-4" />
                                        <h4 className="font-semibold text-slate-800">{item}</h4>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Impact */}
                <div className="bg-[#00897b] rounded-3xl p-12 text-white text-center">
                    <FaHeartbeat className="text-6xl mx-auto mb-6 text-teal-200" />
                    <h2 className="text-3xl font-bold mb-8">{t("Actions.agricultures.plantes_medicinales.impact.title")}</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-12">
                        {t("Actions.agricultures.plantes_medicinales.impact.stats").map((stat, idx) => (
                            <div key={idx}>
                                <span className="block text-5xl font-bold mb-2">{stat.value}</span>
                                <span className="text-teal-100 uppercase tracking-widest text-sm">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
