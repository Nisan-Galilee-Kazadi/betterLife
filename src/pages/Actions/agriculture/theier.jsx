import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaLeaf, FaSpa, FaMugHot } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_the.png";

export default function Theier() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={imgHero}
                    alt="Plantation de Thé"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("Actions.agricultures.the.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("Actions.agricultures.the.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Intro */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker={t("Actions.agricultures.the.intro.kicker")}
                        title={t("Actions.agricultures.the.intro.title")}
                    >
                        {t("Actions.agricultures.the.intro.text")}
                    </SectionTitle>
                </div>

                {/* 3-Column Layout */}
                <div className="grid gap-8 lg:grid-cols-3 mb-20">
                    {/* Types */}
                    <div className="rounded-2xl border border-green-100 bg-green-50 p-8">
                        <FaSpa className="text-4xl text-[#2e7d32] mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{t("Actions.agricultures.the.features.title")}</h3>
                        <ul className="space-y-2">
                            {t("Actions.agricultures.the.features.items").map((item, idx) => (
                                <li key={idx} className="text-slate-700 border-b border-green-200 pb-2 last:border-0">{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Savoir-faire */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg p-8 transform lg:scale-105 z-10">
                        <FaMugHot className="text-5xl text-[#2e7d32] mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{t("Actions.agricultures.the.technique.title")}</h3>
                        <ul className="space-y-3">
                            {t("Actions.agricultures.the.technique.items").map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-slate-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#2e7d32] mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Impact */}
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8">
                        <GiPlantRoots className="text-4xl text-[#0f70b7] mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{t("Actions.agricultures.the.impact.title")}</h3>
                        <div className="space-y-6">
                            {t("Actions.agricultures.the.impact.stats").map((stat, idx) => (
                                <div key={idx}>
                                    <p className="text-3xl font-bold text-[#0f70b7]">{stat.value}</p>
                                    <p className="text-sm text-slate-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
