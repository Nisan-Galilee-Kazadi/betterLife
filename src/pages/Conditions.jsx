import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { FaArrowLeft, FaFileContract } from "react-icons/fa";

export function Conditions() {
    const { t } = useLanguage();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Helper to safely get sections from translation
    const sections = t("conditions.sections") || [];
    // Ensure sections is an array before mapping (in case translation loading is weird)
    const sectionList = Array.isArray(sections) ? sections : Object.values(sections);

    return (
        <div className="bg-white min-h-screen">
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#63b32e] to-[#0f70b7] py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        {t("conditions.title")}
                    </h1>
                    <p className="mt-4 text-white/90">
                        {t("conditions.backToForm") ? "" : "Better Life"}
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Link to="/rejoindre" className="inline-flex items-center text-sm font-semibold text-[#63b32e] hover:text-[#529426] transition-colors">
                        <FaArrowLeft className="mr-2" />
                        {t("conditions.backToForm")}
                    </Link>
                </div>

                <div className="space-y-8 bg-white p-6 sm:p-10 rounded-2xl shadow-xl ring-1 ring-gray-900/5">
                    {sectionList.map((section, index) => (
                        <article key={index} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                            <h2 className="text-xl font-bold text-[#63b32e] mb-3 flex items-start gap-2">
                                {/* If titles already include numbers, we don't need to add them, but the design looks nice with a styled number if separated. 
                                    However, titles in translation include "1. ...". We will just render the title. */}
                                {section.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                                {section.text}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link to="/rejoindre" className="inline-block rounded-full bg-[#63b32e] px-8 py-3 text-base font-bold text-white shadow hover:bg-[#529426] transition-transform transform hover:-translate-y-0.5">
                        {t("conditions.backToForm")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
