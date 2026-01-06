import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaMugHot, FaMountain, FaAward } from "react-icons/fa";
import { GiCoffeeBeans, GiCoffeePot } from "react-icons/gi";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_cafe.png";

export default function Cafe() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={imgHero}
                    alt="Plantation de Café"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("Actions.agricultures.cafe.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("Actions.agricultures.cafe.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Intro */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker={t("Actions.agricultures.cafe.intro.kicker")}
                        title={t("Actions.agricultures.cafe.intro.title")}
                    >
                        {t("Actions.agricultures.cafe.intro.text")}
                    </SectionTitle>
                </div>

                {/* Features Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
                    {t("Actions.agricultures.cafe.features.items").map((item, index) => (
                        <div key={index} className="rounded-xl border border-orange-100 bg-orange-50 p-6 text-center">
                            <FaAward className="mx-auto text-3xl text-[#d84315] mb-3" />
                            <span className="font-semibold text-slate-800">{item}</span>
                        </div>
                    ))}
                </div>

                {/* Process Section */}
                <div className="mb-20 rounded-2xl bg-slate-50 p-8 md:p-12">
                    <div className="grid gap-8 md:grid-cols-2 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">
                                {t("Actions.agricultures.cafe.technique.title")}
                            </h3>
                            <ul className="space-y-4">
                                {t("Actions.agricultures.cafe.technique.items").map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-[#d84315] text-white">
                                            <span className="font-bold text-sm">{index + 1}</span>
                                        </div>
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-center">
                            <GiCoffeeBeans className="text-9xl text-[#3e2723] opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Impact Stats */}
                <div className="grid gap-6 md:grid-cols-2 mb-20">
                    {t("Actions.agricultures.cafe.impact.stats").map((stat, index) => (
                        <div key={index} className="rounded-2xl bg-[#3e2723] p-8 text-center text-white">
                            <p className="text-5xl font-bold mb-2 text-[#ffccbc]">{stat.value}</p>
                            <p className="text-xl opacity-90">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
