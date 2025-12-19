import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaStethoscope, FaSeedling, FaClipboardCheck, FaDna } from "react-icons/fa";
import { GiCow, GiSpermWhale, GiHealthNormal, GiGrain } from "react-icons/gi";
import { useLanguage } from "../../../contexts/LanguageContext";

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
            <div className="relative isolate overflow-hidden bg-stone-900 py-24 sm:py-32">
                <img
                    src={imgHero}
                    alt="Elevage bovin"
                    className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.4]"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t("Actions.elevage.gros_betail.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-stone-200">
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
