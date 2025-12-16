import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { GiBee, GiHoneycomb } from "react-icons/gi";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function Apiculture() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-yellow-500 to-orange-500 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t("Actions.elevage.apiculture.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-yellow-100">
                            {t("Actions.elevage.apiculture.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker="Miel"
                        title={t("Actions.elevage.apiculture.intro.title")}
                    >
                        {t("Actions.elevage.apiculture.intro.text")}
                    </SectionTitle>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {t("Actions.elevage.apiculture.features").map((item, idx) => (
                        <div key={idx} className="p-6 bg-yellow-50 rounded-xl border border-yellow-200 hover:shadow-md transition">
                            <GiHoneycomb className="text-4xl text-yellow-600 mb-4 mx-auto" />
                            <p className="font-semibold text-slate-800 text-center">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
