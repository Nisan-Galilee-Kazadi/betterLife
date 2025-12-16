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
    <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
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
  );
}
