import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaHandsHelping,
  FaGraduationCap,
  FaChartLine,
} from "react-icons/fa";
import { MdScience } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";

export function Phase1() {
  const { t } = useLanguage();

  const activityIcons = [FaUsers, MdScience, FaGraduationCap, FaHandsHelping];
  const activitiesData = t("projets.phase1.activities.items") || [];

  const activities = activitiesData.map((item, index) => ({
    ...item,
    icon: activityIcons[index],
  }));

  const objectives = t("projets.phase1.objectives.items") || [];

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-12">
          <span className="px-4 py-2 bg-blue-100 text-[#0f70b7] rounded-full text-sm font-semibold">
            {t("projets.phase1.hero.status")}
          </span>
          <h1 className="mt-6 text-4xl font-bold text-slate-900">
            {t("projets.phase1.hero.title")}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {t("projets.phase1.hero.subtitle")}
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl bg-blue-50 border-2 border-blue-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {t("projets.phase1.objectives.title")}
            </h2>
            <ul className="space-y-3">
              {objectives.map((obj) => (
                <li key={obj} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#0f70b7] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-slate-700">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-green-50 border border-green-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3">
                {t("projets.phase1.stats.duration.label")}
              </h3>
              <p className="text-3xl font-bold text-[#63b32e]">
                {t("projets.phase1.stats.duration.value")}
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3">
                {t("projets.phase1.stats.budget.label")}
              </h3>
              <p className="text-3xl font-bold text-[#0f70b7]">
                {t("projets.phase1.stats.budget.value")}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {t("projets.phase1.stats.budget.subtext")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-8 border-2 border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {t("projets.phase1.activities.title")}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start bg-white rounded-lg p-4"
                >
                  <activity.icon className="text-4xl text-[#0f70b7] flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-slate-600">{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              to="/projets/en-cours"
              className="rounded-md bg-[#0f70b7] px-6 py-3 text-white font-semibold hover:bg-[#0d5a94] transition"
            >
              ← {t("projets.phase1.navigation.back")}
            </Link>
            <Link
              to="/projets/en-cours/phase2"
              className="rounded-md bg-[#63b32e] px-6 py-3 text-white font-semibold hover:bg-[#529624] transition"
            >
              {t("projets.phase1.navigation.next")} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
