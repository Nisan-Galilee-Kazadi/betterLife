import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaFish } from "react-icons/fa";
import { useLanguage } from "../../../contexts/LanguageContext";

// Image: Fish farming/Water - Unsplash
const imgHero = "https://images.unsplash.com/photo-1549419137-ed002b859341?auto=format&fit=crop&q=80&w=2070";

export default function Pisciculture() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-blue-900 py-24 sm:py-32">
                <img
                    src={imgHero}
                    alt="Pisciculture"
                    className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.4]"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t("Actions.elevage.pisciculture.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-cyan-100">
                            {t("Actions.elevage.pisciculture.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker="Aqua"
                        title={t("Actions.elevage.pisciculture.intro.title")}
                    >
                        {t("Actions.elevage.pisciculture.intro.text")}
                    </SectionTitle>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {t("Actions.elevage.pisciculture.features").map((item, idx) => (
                        <div key={idx} className="p-6 bg-cyan-50 rounded-xl border border-cyan-200 hover:shadow-md transition">
                            <FaFish className="text-4xl text-cyan-600 mb-4 mx-auto" />
                            <p className="font-semibold text-slate-800 text-center">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
