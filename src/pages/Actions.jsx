import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import {
  FaSeedling,
  FaTree,
  FaCloud,
  FaPeopleGroup,
  FaTractor,
  FaCow,
  FaCircleDot,
} from "react-icons/fa6";
// FaHandsHelping is removed as it is not exported by the module
import { useLanguage } from "../contexts/LanguageContext";
import hero_img from "../images/IMG_6687.JPG";

// Build Actions array using translation keys (with fallbacks)
export function Actions() {
  const { t } = useLanguage();

  const Actions = [
    {
      id: "agriculture",
      title: t("nav.agriculture") || "Agriculture ",
      desc:
        t("Actions.index.cards.agriculture.desc") ||
        "Transformation de l’agriculture et adoption de pratiques intelligentes face au climat pour la sécurité alimentaire.",
      icon: FaSeedling,
    },
    {
      id: "elevage",
      title: t("nav.breeding") || "Élevage Responsable",
      desc:
        t("Actions.index.cards.elevage.desc") ||
        "Systèmes d’approvisionnement alimentaire intelligents réduisant les émissions de gaz à effet de serre.",
      icon: FaCow,
    },
    {
      id: "communautaire",
      title: t("nav.community") || "Projets Communautaires",
      desc:
        t("Actions.index.cards.communautaire.desc") ||
        "Promotion du bien-être de la population, santé, éducation et développement rural participatif.",
      icon: FaPeopleGroup,
    },

    {
      id: "Mecanisation Agricole",
      title:
        t("Actions.index.cards.equipements.title") ||
        "Équipements & Formation",
      desc:
        t("Actions.index.cards.equipements.desc") ||
        "Accompagnement technique et matériel pour les producteurs locaux.",
      icon: FaTractor,
    },
    {
      id: "Environement",
      title: t("Actions.Environement") || "Reboisement & Climat",
      desc:
        t("Actions.index.cards.Environement.desc") ||
        "Pépinières scolaires, reboisement et lutte contre le réchauffement climatique via des essences forestières et fruitières.",
      icon: FaTree,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
        <img
          src={hero_img}
          alt="Actions Better Life"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
              {t("Actions.index.title") || "Nos Actions"}
            </h1>
            <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
              {t("Actions.index.subtitle") || "Leviers d'Impact Durable"}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <SectionTitle
          kicker={t("Actions.index.kicker") || "Nos Actions"}
          title={t("Actions.index.title") || "Leviers d'Impact Durable"}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Actions.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-[#63b32e]">
                <item.icon className="h-6 w-6" />
              </div>
              <p className="text-lg font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">
              {t("Actions.index.approach.kicker") || "Approche Intégrée"}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex flex-row item-center gap-2">
                <FaCircleDot className="mt-[6px] text-[#0f70b7] text-[8px]"></FaCircleDot>{" "}
                Synergie entre agriculture et conservation
              </li>
              <li className="flex flex-row item-center gap-2">
                <FaCircleDot className="mt-[6px] text-[#0f70b7] text-[8px]"></FaCircleDot>{" "}
                Implication des communautés locales
              </li>
              <li className="flex flex-row item-center gap-2">
                <FaCircleDot className="mt-[6px] text-[#0f70b7] text-[8px]"></FaCircleDot>{" "}
                Innovation technologique et écologique
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">
              {t("Actions.index.objectives.kicker") || "Objectifs Clés"}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex flex-row item-center gap-2">
                <FaCircleDot className="mt-[6px] text-[#0f70b7] text-[8px]"></FaCircleDot>{" "}
                Sécurité alimentaire durable
              </li>
              <li className="flex flex-row item-center gap-2">
                <FaCircleDot className="mt-[6px] text-[#0f70b7] text-[8px]"></FaCircleDot>{" "}
                Résilience climatique accrue
              </li>
              <li className="flex flex-row item-center gap-2">
                <FaCircleDot className="mt-[6px] text-[#0f70b7] text-[8px]"></FaCircleDot>{" "}
                Restauration des paysages dégradés
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
