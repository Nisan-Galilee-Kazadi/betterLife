import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import {
  FaChartLine,
  FaUsers,
  FaDollarSign,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";

export function ProjetsEnCours() {
  const { t } = useLanguage();

  const projectsProgress = [65, 45, 72];
  const projectsData = Array.isArray(t("projets.en_cours.list"))
    ? t("projets.en_cours.list")
    : [];

  const projects = projectsData.map((project, index) => ({
    ...project,
    progress: projectsProgress[index],
  }));

  const statsIcons = [FaChartLine, FaUsers, FaDollarSign, FaMapMarkedAlt];
  const statsData = Array.isArray(t("projets.en_cours.stats.items"))
    ? t("projets.en_cours.stats.items")
    : [];
  const stats = statsData.map((item, index) => ({
    ...item,
    icon: statsIcons[index],
  }));

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f70b7] to-[#63b32e] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("projets.en_cours.hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              {t("projets.en_cours.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Overview Stats */}
        <div className="mb-20 grid gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border-2 border-blue-100 bg-blue-50 p-6 text-center"
            >
              <stat.icon className="text-5xl mb-2 text-[#0f70b7] mx-auto" />
              <p className="text-3xl font-bold text-[#0f70b7] mb-1">
                {stat.number}
              </p>
              <p className="text-sm text-slate-700">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5"
            >
              {/* Project Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {project.title}
                    </h2>
                    <Link
                      to={`/projets/en-cours/${project.phase
                        .toLowerCase()
                        .replace(" ", "")}`}
                      className="px-3 py-1 bg-blue-100 text-[#0f70b7] text-sm font-semibold rounded-full hover:bg-blue-200 transition"
                    >
                      {project.phase}
                    </Link>
                  </div>
                  <p className="text-slate-600">
                    <FaMapMarkedAlt className="inline mr-2" />
                    {project.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">
                    {t("projets.common.duration")}
                  </p>
                  <p className="font-semibold text-slate-900">
                    {project.duration}
                  </p>
                </div>
              </div>

              <p className="text-lg text-slate-700 mb-6">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700">
                    {t("projets.common.progress")}
                  </span>
                  <span className="text-2xl font-bold text-[#63b32e]">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#63b32e] to-[#0f70b7] transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <p className="text-sm text-slate-600 mb-1">
                    {t("projets.common.budget")}
                  </p>
                  <p className="text-2xl font-bold text-[#63b32e]">
                    {project.budget}
                  </p>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-slate-600 mb-1">
                    {t("projets.common.beneficiaries")}
                  </p>
                  <p className="text-2xl font-bold text-[#0f70b7]">
                    {project.beneficiaries}
                  </p>
                </div>
              </div>

              {/* Objectives and Achievements */}
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MdTrendingUp className="text-[#0f70b7]" />
                    {t("projets.common.objectives")}
                  </h3>
                  <ul className="space-y-2">
                    {project.objectives &&
                      project.objectives.map((obj, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <span className="text-[#0f70b7] mt-1">▸</span>
                          {obj}
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#63b32e]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("projets.common.realizations")}
                  </h3>
                  <ul className="space-y-2">
                    {project.achievements &&
                      project.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-700"
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
                          {achievement}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("projets.en_cours.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("projets.en_cours.cta.text")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#0f70b7] shadow-lg transition hover:bg-slate-50"
            >
              {t("projets.common.donate")}
            </Link>
            <Link
              to="/rejoindre"
              className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
            >
              {t("projets.common.partner")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
