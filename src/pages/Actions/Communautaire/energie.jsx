import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaSolarPanel, FaBolt, FaWater } from "react-icons/fa";
import hero_img from "./images/hero_energie.webp";

export default function Energie() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={hero_img}
                    alt="Énergie renouvelable"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("Actions.communautaire.energie.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("Actions.communautaire.energie.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker="Électricité"
                        title={t("Actions.communautaire.energie.intro.title")}
                    >
                        {t("Actions.communautaire.energie.intro.text")}
                    </SectionTitle>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {t("Actions.communautaire.energie.features").map((item, idx) => (
                        <div key={idx} className="p-6 bg-yellow-50 rounded-xl border border-yellow-200 hover:shadow-md transition text-center">
                            <FaSolarPanel className="text-4xl text-amber-500 mb-4 mx-auto" />
                            <p className="font-semibold text-amber-900">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
