import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import { FaBriefcase, FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import employment_hero from "../images/employment_hero.webp";

export const EmploiStage = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-zinc-900 py-32 sm:py-48 overflow-hidden">
                <img
                    src={employment_hero}
                    alt="Careers at Better Life"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t("employment.hero.title")}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t("employment.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-[#63b32e]">
                            {t("employment.summary.title")}
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {t("employment.summary.text")}
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                            {/* Jobs Section */}
                            <div className="flex flex-col p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition">
                                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#63b32e]">
                                        <FaBriefcase className="h-6 w-6 text-white" />
                                    </div>
                                    {t("employment.jobs.title")}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 font-medium italic">
                                    <p className="flex-auto italic font-medium">
                                        {t("employment.jobs.description")}
                                    </p>
                                    <div className="mt-8">
                                        <Link
                                            to="/emplois-stages/emploi"
                                            className="inline-flex items-center justify-center rounded-md bg-[#63b32e] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#529426] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#63b32e] transition"
                                        >
                                            {t("employment.jobs.btn")}
                                        </Link>
                                    </div>
                                </dd>
                            </div>

                            {/* Internships Section */}
                            <div className="flex flex-col p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition">
                                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#63b32e]">
                                        <FaGraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                    {t("employment.internships.title")}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto italic font-medium">
                                        {t("employment.internships.description")}
                                    </p>
                                    <div className="mt-8">
                                        <Link
                                            to="/emplois-stages/stage"
                                            className="inline-flex items-center justify-center rounded-md bg-white border-2 border-[#63b32e] px-6 py-3 text-sm font-semibold text-[#63b32e] shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#63b32e] transition"
                                        >
                                            {t("employment.internships.btn")}
                                        </Link>
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
