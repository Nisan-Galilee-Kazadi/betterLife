import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../../components/SectionTitle";
import { FaCloud, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function CreditCarbone() {
    const { t } = useLanguage();

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t("Actions.environnement.credit_carbone.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-teal-100">
                            {t("Actions.environnement.credit_carbone.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker="Finance Verte"
                        title={t("Actions.environnement.credit_carbone.intro.title")}
                    >
                        {t("Actions.environnement.credit_carbone.intro.text")}
                    </SectionTitle>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {t("Actions.environnement.credit_carbone.features").map((item, idx) => (
                        <div key={idx} className="p-6 bg-teal-50 rounded-xl border border-teal-200 hover:shadow-md transition text-center">
                            <FaCloud className="text-4xl text-teal-600 mb-4 mx-auto" />
                            <p className="font-semibold text-teal-900">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
