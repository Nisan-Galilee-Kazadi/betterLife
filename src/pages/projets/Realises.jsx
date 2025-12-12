import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import {
  FaCheckCircle,
  FaUsers,
  FaDollarSign,
  FaTree,
  FaHandsHelping,
  FaChartLine,
  FaCalendar,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";

export function ProjetsRealises() {
  const { t } = useLanguage();

  const completedProjects = Array.isArray(t("projets.realises.list"))
    ? t("projets.realises.list")
    : [];

  const impactIcons = [FaCheckCircle, FaUsers, FaDollarSign, FaTree];
  const impactColors = ["green", "blue", "green", "blue"];
  const impactData = Array.isArray(t("projets.realises.impact.items"))
    ? t("projets.realises.impact.items")
    : [];

  // Merge impact data with visual props
  const impactStats = impactData.map((item, index) => ({
    ...item,
    icon: impactIcons[index],
    color: impactColors[index],
  }));

  const factorIcons = [FaHandsHelping, FaChartLine, MdTrendingUp];
  const factorsData = Array.isArray(t("projets.realises.factors.items"))
    ? t("projets.realises.factors.items")
    : [];

  // Merge factors with icons
  const factors = factorsData.map((item, index) => ({
    ...item,
    icon: factorIcons[index],
  }));

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#63b32e] to-[#0f70b7] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("projets.realises.hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              {t("projets.realises.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Overall Impact */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("projets.realises.impact.kicker")}
              title={t("projets.realises.impact.title")}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className={`rounded-2xl border-2 ${
                  stat.color === "green"
                    ? "border-green-200 bg-green-50"
                    : "border-blue-200 bg-blue-50"
                } p-6 text-center`}
              >
                <stat.icon
                  className={`text-6xl mb-3 mx-auto ${
                    stat.color === "green" ? "text-[#63b32e]" : "text-[#0f70b7]"
                  }`}
                />
                <p className="text-4xl font-bold text-[#63b32e] mb-2">
                  {stat.number}
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Projects */}
        <div className="space-y-16">
          {completedProjects.map((project, index) => (
            <div
              key={index}
              className="rounded-3xl bg-gradient-to-br from-slate-50 to-green-50 p-8 border-2 border-green-200"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-slate-600 flex items-center gap-2">
                    <FaMapMarkedAlt className="text-[#63b32e]" />
                    {project.location}
                  </p>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                    <FaCalendar className="text-[#0f70b7]" />
                    {project.period}
                  </p>
                </div>
                <div className="px-4 py-2 bg-[#63b32e] text-white rounded-full font-semibold flex items-center gap-2">
                  <FaCheckCircle />
                  Completed
                </div>
              </div>

              <p className="text-lg text-slate-700 mb-8">
                {project.description}
              </p>

              {/* Impact Metrics */}
              <div className="grid gap-4 md:grid-cols-4 mb-8">
                {project.impact &&
                  Object.entries(project.impact).map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-xl bg-white p-4 text-center shadow-sm"
                    >
                      <p className="text-2xl font-bold text-[#63b32e] mb-1">
                        {value.split(" ")[0]}
                      </p>
                      <p className="text-xs text-slate-600">
                        {value.split(" ").slice(1).join(" ")}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Achievements */}
              <div className="mb-8">
                <h3 className="font-bold text-slate-900 mb-4 text-xl flex items-center gap-2">
                  <MdTrendingUp className="text-[#63b32e]" />
                  {t("projets.common.realizations")}
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {project.achievements &&
                    project.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-white rounded-lg p-3"
                      >
                        <svg
                          className="w-5 h-5 text-[#63b32e] flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-slate-700">
                          {achievement}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div className="rounded-2xl bg-white p-6 border-l-4 border-[#63b32e]">
                  <p className="text-slate-700 italic mb-4">
                    "{project.testimonial.quote}"
                  </p>
                  <p className="text-sm font-semibold text-[#0f70b7]">
                    — {project.testimonial.author}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Success Factors */}
        <div className="mt-20 mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("projets.realises.factors.kicker")}
              title={t("projets.realises.factors.title")}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {factors.map((factor, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 text-center"
              >
                <factor.icon className="text-7xl mb-4 text-[#63b32e] mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {factor.title}
                </h3>
                <p className="text-slate-600">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-[#63b32e] to-[#0f70b7] p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("projets.realises.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("projets.realises.cta.text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
            >
              {t("projets.common.support")}
            </Link>
            <Link
              to="/projets"
              className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              {t("projets.common.viewOngoing")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
