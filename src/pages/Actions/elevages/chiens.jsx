import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaDog } from "react-icons/fa";
import { useLanguage } from "../../../contexts/LanguageContext";

// Image: Guard Dog (Malinois) - Unsplash
const imgHero = "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&q=80&w=2089";

export default function Chiens() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-zinc-900 py-24 sm:py-32">
                <img
                    src={imgHero}
                    alt="Elevage canin"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_100%] brightness-[0.4]"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t("Actions.elevage.chiens.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-zinc-300">
                            {t("Actions.elevage.chiens.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker="Canin"
                        title={t("Actions.elevage.chiens.intro.title")}
                    >
                        {t("Actions.elevage.chiens.intro.text")}
                    </SectionTitle>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {t("Actions.elevage.chiens.features").map((item, idx) => (
                        <div key={idx} className="p-6 bg-zinc-50 rounded-xl border border-zinc-200 hover:shadow-md transition">
                            <FaDog className="text-4xl text-zinc-600 mb-4 mx-auto" />
                            <p className="font-semibold text-zinc-800 text-center">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
