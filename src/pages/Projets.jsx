import React from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../components/SectionTitle";
import { FaMapMarkerAlt, FaUsers, FaDollarSign, FaTree } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

export function Projets() {
  const { t } = useLanguage();

  // Get projects from translation
  const projectsData = t("projets.index.featured.items") || [];

  // Add id and link to each project (assuming same order as original)
  const projects = projectsData.map((project, index) => ({
    ...project,
    id: index + 1,
    link: "/projets/en-cours",
  }));

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f70b7] to-[#63b32e] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("projets.index.hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              {t("projets.index.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Map Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("projets.index.map.kicker")}
              title={t("projets.index.map.title")}
            />
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              {t("projets.index.map.text")}
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4073524.123456!2d18.0!3d-4.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3c0d0d0d0d0d%3A0x0!2sKinshasa%2C%20Democratic%20Republic%20of%20the%20Congo!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("projets.index.map.title")}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <Link
            to="/projets/en-cours"
            className="group rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg transition hover:shadow-2xl hover:border-[#0f70b7]"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0f70b7] transition">
              {t("projets.index.quickLinks.ongoing.title")}
            </h3>
            <p className="text-slate-600 mb-4">
              {t("projets.index.quickLinks.ongoing.text")}
            </p>
            <span className="inline-flex items-center text-[#0f70b7] font-semibold">
              {t("projets.common.details")} →
            </span>
          </Link>

          <Link
            to="/projets/realises"
            className="group rounded-3xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-8 shadow-lg transition hover:shadow-2xl hover:border-[#63b32e]"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#63b32e] transition">
              {t("projets.index.quickLinks.completed.title")}
            </h3>
            <p className="text-slate-600 mb-4">
              {t("projets.index.quickLinks.completed.text")}
            </p>
            <span className="inline-flex items-center text-[#63b32e] font-semibold">
              {t("projets.common.achievements")} →
            </span>
          </Link>
        </div>

        {/* Featured Projects */}
        <div>
          <div className="text-center mb-12">
            <SectionTitle
              kicker={t("projets.index.featured.kicker")}
              title={t("projets.index.featured.title")}
            />
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg transition hover:shadow-xl hover:border-[#63b32e]"
              >
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-[#0f70b7] rounded-full text-xs font-semibold">
                    {project.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#63b32e]" />
                  {project.location}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center gap-2">
                      <FaUsers className="text-[#0f70b7]" />
                      {t("projets.common.beneficiaries")}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {project.beneficiaries}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center gap-2">
                      <FaDollarSign className="text-[#0f70b7]" />
                      {t("projets.common.budget")}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {project.budget}
                    </span>
                  </div>
                  {project.trees !== "0" && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 flex items-center gap-2">
                        <FaTree className="text-[#63b32e]" />
                        {t("projets.common.trees")}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {project.trees}
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  to={project.link}
                  className="block w-full text-center rounded-lg bg-gradient-to-r from-[#63b32e] to-[#0f70b7] px-4 py-3 font-semibold text-white transition hover:brightness-110"
                >
                  {t("projets.common.readMore")}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("projets.index.cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t("projets.index.cta.text")}
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
