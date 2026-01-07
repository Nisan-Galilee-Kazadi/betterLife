import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaTools } from "react-icons/fa";
import { useLanguage } from "../../../contexts/LanguageContext";

// Importing images from relative path - taking the rest of images
import img7 from "./images/IMG-20251215-WA0006.webp";
import img8 from "./images/IMG-20251215-WA0007.webp";
import img9 from "./images/IMG-20251215-WA0008.webp";
import img10 from "./images/IMG-20251215-WA0009.webp";
import img11 from "./images/IMG-20251215-WA0010.webp";
import img12 from "./images/IMG-20251215-WA0011.webp";

export default function Accessoires() {
    const { t } = useLanguage();
    const gallery = [img7, img8, img9, img10, img11, img12];

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={img7}
                    alt="Accessoires agricoles"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("Actions.mecanisation.accessoires.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("Actions.mecanisation.accessoires.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker="Outils"
                        title={t("Actions.mecanisation.accessoires.intro.title")}
                    >
                        {t("Actions.mecanisation.accessoires.intro.text")}
                    </SectionTitle>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {gallery.map((img, idx) => (
                        <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition hover:scale-105 cursor-pointer">
                            <img src={img} alt={`Accessoire ${idx + 1}`} className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-bold text-lg border border-white px-4 py-2 rounded-full">
                                    Voir Outil
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {t("Actions.mecanisation.accessoires.features").map((item, idx) => (
                        <div key={idx} className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
                            <FaTools className="mx-auto text-4xl text-blue-600 mb-3" />
                            <span className="font-semibold text-slate-800">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
