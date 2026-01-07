import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaStethoscope, FaSeedling, FaClipboardCheck, FaDna } from "react-icons/fa";
import { GiCow, GiSpermWhale, GiHealthNormal, GiGrain } from "react-icons/gi";
import { useLanguage } from "../../../contexts/LanguageContext";
import hero_betail from "./images/hero_gros_betail.webp";

// Image: Cattle in field - Unsplash
const imgHero = "https://images.unsplash.com/photo-1541625602330-2277db6e788d?auto=format&fit=crop&q=80&w=2070";

const featureIcons = [
    <FaDna className="text-4xl text-green-600 mb-4 mx-auto" />,
    <FaStethoscope className="text-4xl text-blue-600 mb-4 mx-auto" />,
    <GiGrain className="text-4xl text-yellow-600 mb-4 mx-auto" />,
    <FaClipboardCheck className="text-4xl text-purple-600 mb-4 mx-auto" />
];

export default function GrosBetail() {
    const { t } = useLanguage();
    const features = t("Actions.elevage.gros_betail.features");

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={hero_betail}
                    alt="Elevage bovin"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("Actions.elevage.gros_betail.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("Actions.elevage.gros_betail.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker={t("Actions.elevage.gros_betail.intro.kicker")}
                        title={t("Actions.elevage.gros_betail.intro.title")}
                    >
                        {t("Actions.elevage.gros_betail.intro.text")}
                    </SectionTitle>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {Array.isArray(features) && features.map((item, idx) => (
                        <div key={idx} className="p-6 bg-white rounded-xl border border-stone-200 hover:shadow-md transition hover:border-green-200">
                            {featureIcons[idx % featureIcons.length]}
                            <h3 className="text-lg font-semibold text-stone-800 text-center mb-2">{item.title}</h3>
                            <p className="text-stone-600 text-center text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
