import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaSeedling, FaLeaf, FaSun, FaChartBar, FaTree } from "react-icons/fa";
import { GiChocolateBar, GiCoffeeBeans, GiFarmer } from "react-icons/gi";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_cacao.webp";

export default function Cacao() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={imgHero}
                    alt="Plantation de cacao"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("Actions.agricultures.cacao.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("Actions.agricultures.cacao.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Intro */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker={t("Actions.agricultures.cacao.intro.kicker")}
                        title={t("Actions.agricultures.cacao.intro.title")}
                    >
                        {t("Actions.agricultures.cacao.intro.text")}
                    </SectionTitle>
                </div>

                {/* Features & Techniques Combined Grid */}
                <div className="grid gap-8 lg:grid-cols-2 mb-20">
                    {/* Features */}
                    <div className="rounded-2xl border-2 border-[#795548]/20 bg-[#fefebe] p-8">
                        <GiCoffeeBeans className="text-5xl text-[#5d4037] mb-6" />
                        <h3 className="text-2xl font-bold text-[#3e2723] mb-6">
                            {t("Actions.agricultures.cacao.features.title")}
                        </h3>
                        <p className="text-slate-700 mb-4">{t("Actions.agricultures.cacao.features.kicker")}</p>
                        <ul className="space-y-4">
                            {t("Actions.agricultures.cacao.features.items").map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <FaTree className="text-[#795548]" />
                                    <span className="text-slate-800">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Techniques */}
                    <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8">
                        <FaSeedling className="text-5xl text-[#63b32e] mb-6" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">
                            {t("Actions.agricultures.cacao.technique.title")}
                        </h3>
                        <ul className="space-y-4">
                            {t("Actions.agricultures.cacao.technique.items").map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#63b32e]" />
                                    <span className="text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Impact Stats */}
                <div className="mb-20">
                    <div className="rounded-2xl bg-[#3e2723] p-12 text-white text-center">
                        <h2 className="text-3xl font-bold mb-12">{t("Actions.agricultures.cacao.impact.title")}</h2>
                        <div className="grid gap-8 md:grid-cols-2 justify-center max-w-4xl mx-auto">
                            {t("Actions.agricultures.cacao.impact.stats").map((stat, index) => (
                                <div key={index} className="p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                                    <p className="text-4xl font-bold mb-2 text-[#d7ccc8]">{stat.value}</p>
                                    <p className="text-lg">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        to="/contact"
                        className="inline-block rounded-md bg-[#63b32e] px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#5a9e29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#63b32e]"
                    >
                        {t("Actions.agriculture.cta.btn_train") || "Nous contacter"}
                    </Link>
                </div>
            </div>
        </div>
    );
}