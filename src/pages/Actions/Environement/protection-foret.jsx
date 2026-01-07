import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaTree, FaShieldAlt, FaBinoculars } from "react-icons/fa";
import { useLanguage } from "../../../contexts/LanguageContext";

import hero_img from "./images/hero_protection_foret.webp";

export default function ProtectionForet() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={hero_img}
                    alt="Forêt tropicale"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("Actions.environement.protection_foret.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("Actions.environement.protection_foret.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker="Conservation"
                        title={t("Actions.environement.protection_foret.intro.title")}
                    >
                        {t("Actions.environement.protection_foret.intro.text")}
                    </SectionTitle>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {t("Actions.environement.protection_foret.features").map((item, idx) => (
                        <div key={idx} className="p-6 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition text-center">
                            <FaShieldAlt className="text-4xl text-green-700 mb-4 mx-auto" />
                            <p className="font-semibold text-green-900">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
