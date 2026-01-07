import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaAppleAlt, FaLemon, FaTree, FaLeaf } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_arboriculture.webp";

export default function Arboriculture() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={imgHero}
                    alt="Vergers arboricoles"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("Actions.agricultures.arboriculture.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("Actions.agricultures.arboriculture.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Intro */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker={t("Actions.agricultures.arboriculture.intro.kicker")}
                        title={t("Actions.agricultures.arboriculture.intro.title")}
                    >
                        {t("Actions.agricultures.arboriculture.intro.text")}
                    </SectionTitle>
                </div>

                {/* Fruit Gallery / Varieties */}
                <div className="mb-20">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-slate-900">{t("Actions.agricultures.arboriculture.features.title")}</h3>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {t("Actions.agricultures.arboriculture.features.items").map((item, idx) => {
                            // Adding some random consistent icons for variety
                            const icons = [GiFruitBowl, FaLemon, FaLeaf, FaAppleAlt];
                            const Icon = icons[idx % icons.length];
                            return (
                                <div key={idx} className="group relative overflow-hidden rounded-2xl bg-[#fff8e1] p-8 text-center transition hover:bg-[#ffecb3]">
                                    <Icon className="mx-auto text-5xl text-[#ffb300] mb-4 transition group-hover:scale-110" />
                                    <h4 className="font-bold text-slate-800">{item}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Practices & Impact Split */}
                <div className="grid gap-12 lg:grid-cols-2 items-start">
                    <div className="bg-slate-50 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <FaTree className="text-[#7cb342]" />
                            {t("Actions.agricultures.arboriculture.technique.title")}
                        </h3>
                        <ul className="space-y-4">
                            {t("Actions.agricultures.arboriculture.technique.items").map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#7cb342] text-white text-xs font-bold">✓</span>
                                    <span className="text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-[#7cb342] to-[#558b2f] rounded-3xl p-8 text-white">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <GiFruitBowl />
                            {t("Actions.agricultures.arboriculture.impact.title")}
                        </h3>
                        <div className="space-y-8">
                            {t("Actions.agricultures.arboriculture.impact.stats").map((stat, idx) => (
                                <div key={idx}>
                                    <p className="text-4xl font-black mb-1">{stat.value}</p>
                                    <p className="text-white/80 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
