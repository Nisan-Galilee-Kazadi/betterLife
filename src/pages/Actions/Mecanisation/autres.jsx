import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaCogs } from "react-icons/fa";
import { useLanguage } from "../../../contexts/LanguageContext";

// Reusing img1 for generic header as it is high quality
import imgHeader from "./images/IMG-20251215-WA0000.jpg";

export default function Autres() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    src={imgHeader}
                    alt="Autres équipements"
                    className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.3]"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t("Actions.mecanisation.autres.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-200">
                            {t("Actions.mecanisation.autres.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker="Innovation"
                        title={t("Actions.mecanisation.autres.intro.title")}
                    >
                        {t("Actions.mecanisation.autres.intro.text")}
                    </SectionTitle>
                </div>

                {/* Features */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {t("Actions.mecanisation.autres.features").map((item, idx) => (
                        <div key={idx} className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center hover:bg-slate-100 transition">
                            <FaCogs className="mx-auto text-5xl text-slate-600 mb-4" />
                            <span className="font-bold text-lg text-slate-900">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
