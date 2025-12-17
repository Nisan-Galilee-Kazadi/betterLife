import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaRoad, FaTruck, FaMapMarkedAlt } from "react-icons/fa";
import { useLanguage } from "../../../contexts/LanguageContext";

const imgHero = "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2070";

export default function RoutesDesserte() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    src={imgHero}
                    alt="Routes de desserte agricole"
                    className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.4]"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t("Actions.communautaire.routes_desserte.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-neutral-300">
                            {t("Actions.communautaire.routes_desserte.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker="Accessibilité"
                        title={t("Actions.communautaire.routes_desserte.intro.title")}
                    >
                        {t("Actions.communautaire.routes_desserte.intro.text")}
                    </SectionTitle>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {t("Actions.communautaire.routes_desserte.features").map((item, idx) => (
                        <div key={idx} className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 hover:shadow-md transition text-center">
                            <FaRoad className="text-4xl text-neutral-600 mb-4 mx-auto" />
                            <p className="font-semibold text-neutral-800">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
