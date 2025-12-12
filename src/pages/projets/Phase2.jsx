import React from "react";
import { Link } from "react-router-dom";
import {
  FaTractor,
  FaBox,
  FaGraduationCap,
  FaChartLine,
  FaHammer,
  FaUsers,
} from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";

export function Phase2() {
  const { t } = useLanguage();

  const activityIcons = [
    FaTractor,
    FaBox,
    FaGraduationCap,
    FaChartLine,
    FaHammer,
    FaUsers,
  ];
  const activitiesData = t("projets.phase2.activities.items") || [];

  const activities = activitiesData.map((item, index) => ({
    ...item,
    icon: activityIcons[index],
  }));

  const objectives = t("projets.phase2.objectives.items") || [];
  const attentionPoints = t("projets.phase2.attention.items") || [];

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center mb-12">
          <span className="px-4 py-2 bg-green-100 text-[#63b32e] rounded-full text-sm font-semibold">
            {t("projets.phase2.hero.status")}
          </span>
          <h1 className="mt-6 text-4xl font-bold text-slate-900">
            {t("projets.phase2.hero.title")}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {t("projets.phase2.hero.subtitle")}
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl bg-green-50 border-2 border-green-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {t("projets.phase2.objectives.title")}
            </h2>
            <ul className="space-y-3">
              {objectives.map((obj) => (
                <li key={obj} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#63b32e] flex-shrink-0 mt-0.5"
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
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3">
                {t("projets.phase2.stats.duration.label")}
              </h3>
              <p className="text-3xl font-bold text-[#0f70b7]">
                {t("projets.phase2.stats.duration.value")}
              </p>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3">
                {t("projets.phase2.stats.budget.label")}
              </h3>
              <p className="text-3xl font-bold text-[#63b32e]">
                {t("projets.phase2.stats.budget.value")}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {t("projets.phase2.stats.budget.subtext")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-green-50 p-8 border-2 border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {t("projets.phase2.activities.title")}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start bg-white rounded-lg p-4"
                >
                  <activity.icon className="text-4xl text-[#63b32e] flex-shrink-0" />
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

          <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-6">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#0f70b7]">⚠️</span>
              {t("projets.phase2.attention.title")}
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {attentionPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              to="/projets/en-cours/phase1"
              className="rounded-md bg-[#0f70b7] px-6 py-3 text-white font-semibold hover:bg-[#0d5a94] transition"
            >
              ← {t("projets.phase2.navigation.back")}
            </Link>
            <Link
              to="/projets/en-cours"
              className="rounded-md bg-[#63b32e] px-6 py-3 text-white font-semibold hover:bg-[#529624] transition"
            >
              {t("projets.phase2.navigation.return")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
