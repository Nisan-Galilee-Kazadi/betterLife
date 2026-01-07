import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaIndustry, FaTshirt, FaCar, FaFlask, FaCloud, FaTree } from "react-icons/fa";
// import { GiCottonFlower, GiRubberBoot } from "react-icons/gi"; // Removing likely invalid icons
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_coton_hevea.webp";

export default function CotonCaoutchouc() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={imgHero}
                    alt="Coton et Hévéa"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("Actions.agricultures.coton_caoutchouc.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("Actions.agricultures.coton_caoutchouc.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Intro */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker={t("Actions.agricultures.coton_caoutchouc.intro.kicker")}
                        title={t("Actions.agricultures.coton_caoutchouc.intro.title")}
                    >
                        {t("Actions.agricultures.coton_caoutchouc.intro.text")}
                    </SectionTitle>
                </div>

                {/* Dual Industry Section */}
                <div className="grid gap-12 lg:grid-cols-2 mb-20">
                    {/* Coton */}
                    <div className="rounded-2xl border bg-slate-50 p-8 hover:shadow-lg transition">
                        <div className="flex items-center gap-4 mb-6">
                            <FaCloud className="text-5xl text-[#546e7a]" />
                            <h2 className="text-3xl font-bold text-slate-800">Coton</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-slate-600 italic">"L'or blanc de l'industrie textile"</p>
                            {t("Actions.agricultures.coton_caoutchouc.features.items").slice(0, 2).map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                    <FaTshirt className="text-[#90a4ae]" />
                                    <span className="font-medium text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rubber (Hévéa) */}
                    <div className="rounded-2xl border bg-slate-50 p-8 hover:shadow-lg transition">
                        <div className="flex items-center gap-4 mb-6">
                            <FaTree className="text-5xl text-[#37474f]" />
                            <h2 className="text-3xl font-bold text-slate-800">Hévéa</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-slate-600 italic">"Le moteur de la mobilité"</p>
                            {t("Actions.agricultures.coton_caoutchouc.features.items").slice(2, 4).map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                    <FaCar className="text-[#78909c]" />
                                    <span className="font-medium text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Agro-Industry Tech */}
                <div className="mb-20 bg-slate-900 rounded-3xl p-12 text-center">
                    <h3 className="text-2xl font-bold text-white mb-8">
                        {t("Actions.agricultures.coton_caoutchouc.technique.title")}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {t("Actions.agricultures.coton_caoutchouc.technique.items").map((item, idx) => (
                            <span key={idx} className="inline-flex items-center rounded-full bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30">
                                <FaIndustry className="mr-2" /> {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-2">
                    {t("Actions.agricultures.coton_caoutchouc.impact.stats").map((stat, idx) => (
                        <div key={idx} className="text-center p-6 border-b-2 border-slate-100 last:border-0 md:border-0 hover:bg-slate-50 transition">
                            <p className="text-5xl font-extrabold text-[#455a64] mb-2">{stat.value}</p>
                            <p className="text-lg text-slate-600 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
