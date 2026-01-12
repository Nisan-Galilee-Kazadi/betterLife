import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import {
  FaHandshake,
  FaMapMarkerAlt,
  FaUser,
  FaUsers,
  FaBuilding,
} from "react-icons/fa";
import partners_hero from "../../images/partners_hero.webp";
import { useLanguage } from "../../contexts/LanguageContext";

export function Partners() {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Real partner data extracted from PDF
  const partnersByRegion = {
    "haut-katanga": [
      { name: "MWAMBA SALIMA Marie-Claire", contact: "0853251084" },
      { name: "MULUKA G\u00e9rard", contact: "0997027431" },
      { name: "TSHILANDA Solange", contact: "0999686334" },
      { name: "LUBAMBA WA LUBAMBA Alex", contact: "0820356400" },
      { name: "ILUNGA NGOYI Teddy" },
      { name: "MUSAFIRI BUYA Beatrice" },
      { name: "MPINDA CIKALA" },
      { name: "MUYUMBA KIYANA Emmanuel" },
      { name: "MWADI KANYIKI Didine" },
      { name: "KABANGA LUBUYA Ina" },
      { name: "ODIA CIANI Auguy" },
      { name: "SELEMANI G\u00e9rard" },
      { name: "ILUNGU MWAMBA Alba" },
      { name: "KAKUDJIWA NKULU Jeanine" },
      { name: "TSHISWAKA NKUBA Alain" },
      { name: "KABAMBA Jephté" },
      { name: "KABONGU LWABA Bill" },
      { name: "MBUINGA DI NKUANGA Juslain" },
      { name: "KATOMBE MOLOWA Gustave" },
      { name: "MUKOLAYI JHON LAGODAS" },
      { name: "AMISI Oscar" }
    ],
    "kongo-central": [
      { name: "KILOLA LUMBU" },
      { name: "LUPANGWA Jacques" },
      { name: "PAROISSE SAINT MICHEL KITIMA", type: "Institution" },
      { name: "MAKOKO Ferdinand Abbé", type: "Religieux" },
      { name: "DIOCESE DE BOMA", type: "Institution" },
      { name: "CALL IS BUSINESS SARL", type: "Entreprise" },
      { name: "NZOLANI KUYADILUA Laurianne" },
      { name: "MUKOTSHI MONDO Blaise" },
      { name: "NDEMBE Jean-Claude" },
      { name: "KABANGU Pierre", title: "Ministre" },
      { name: "KUMBU MATONDO Joseph" },
      { name: "META MONIKA Adolphonie" },
      { name: "KAMBU MWAKA Edouard" },
      { name: "KAMBU KAMBU Joachim" },
      { name: "SARMA", type: "Organisation" },
      { name: "Abbé Aime NSUAMI", type: "Religieux" },
      { name: "MUKOLAYI John", company: "Sté LAGODAS" },
      { name: "MABIALA NGIMBI Gina" },
      { name: "KHONDE NDUNDA Crispin" }
    ],
    kinshasa: [
      { name: "MONDONGA TIGOMBAY Fidel" },
      { name: "LUIBA LU NGIMBI Eugène" },
      { name: "FOMAPE", contact: "MUTOMBO Symphorien" },
      { name: "KATOMBE MALOWA Gustave" },
      { name: "MABANGA PHUATI Joseph" },
      { name: "RA.JE.CO.PA", type: "Organisation" },
      { name: "MABOTI BOBO Jodi" },
      { name: "OTETE LOKADI DOUDOU Serge" },
      { name: "YENGA YENGA Raméal" },
      { name: "Paul et William", category: "Vulgarisation" },
      { name: "LUKUSA Neville", category: "Vulgarisation" },
      { name: "NZAU MAKAYA", category: "Vulgarisation" },
      { name: "KOLELA Jean-Bertin", category: "Vulgarisation" },
      { name: "DENDE SAMORA Vincent", category: "Vulgarisation" },
      { name: "NTAMBWE MPOSHI Eliezer" },
      { name: "MBIYE Elie" },
      { name: "MUTOMBO Ruth" },
      { name: "MBUYI MPOYI STANIS Alain" },
      { name: "MUKOTSHI Blaise" },
      { name: "ACDECO", type: "Organisation" },
      { name: "MUKANYA SHABANTYA Raymond" },
      { name: "KALONDA KAPENGA Mamie" },
      { name: "NDEVU Emmanuel" },
      { name: "MOYOGO MOMBILI Michel" },
      { name: "MBUYA MBAYO Jean-Marie" },
      { name: "SOCIETE KBD", contact: "Mr Sylvain" }
    ],
    autres: [
      { name: "MABAYA GIZI Jean-Philibert", region: "Kikwit", title: "Sénateur" },
      { name: "BOSUMBE MENDELA Fatou", region: "Tshopo" },
      { name: "SINYEMBO NGUNGWA Christian", region: "Kasai-Oriental" },
      { name: "MULUMBA Dorcas", region: "Kasai-Oriental" },
      { name: "MBELU Claudine Esther", region: "Kasai-Oriental" },
      { name: "KISHI KAJI Christelle", region: "Lualaba" },
      { name: "MONSEIGNEUR SANGWA Jules", region: "Lualaba", type: "Religieux" },
      { name: "MUSENGA TSHIEY Virginie", region: "Kasai-Central" }
    ]
  };

  const regionNames = {
    all: "Tous les partenaires",
    "haut-katanga": "Haut-Katanga",
    "kongo-central": "Kongo Central",
    kinshasa: "Kinshasa",
    autres: "Autres Régions"
  };

  const getFilteredPartners = () => {
    if (selectedRegion === "all") {
      return Object.entries(partnersByRegion).flatMap(([region, partners]) =>
        partners.map(p => ({ ...p, region }))
      );
    }
    return partnersByRegion[selectedRegion].map(p => ({ ...p, region: selectedRegion }));
  };

  const filteredPartners = getFilteredPartners();
  const totalPartners = Object.values(partnersByRegion).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-32 sm:py-48">
        <img
          src={partners_hero}
          alt="Better Life Partners"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-30"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("about.partners.hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              Un réseau solide de {totalPartners} partenaires à travers la RDC
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <SectionTitle
            kicker="Notre Réseau"
            title="Partenaires de Better Life"
          >
            Une communauté engagée pour le développement durable et la sécurité alimentaire en République Démocratique du Congo.
          </SectionTitle>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 mb-16">
          {Object.entries(regionNames).filter(([key]) => key !== "all").map(([key, name]) => (
            <div key={key} className="rounded-2xl border-2 border-slate-100 bg-gradient-to-br from-[#63b32e]/5 to-[#0f70b7]/5 p-6 text-center">
              <div className="text-3xl font-bold text-[#0f70b7] mb-2">
                {partnersByRegion[key].length}
              </div>
              <div className="text-sm font-semibold text-slate-700">{name}</div>
            </div>
          ))}
        </div>

        {/* Region Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(regionNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${selectedRegion === key
                  ? "bg-[#63b32e] text-white shadow-lg scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map((partner, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 hover:border-[#63b32e] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#63b32e]/5 to-[#0f70b7]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f70b7] to-[#0f70b7]/80 text-white shadow-lg group-hover:from-[#63b32e] group-hover:to-[#63b32e]/80 transition-all duration-300 group-hover:scale-110">
                    {partner.type === "Institution" || partner.type === "Organisation" ? (
                      <FaBuilding className="h-7 w-7" />
                    ) : partner.company ? (
                      <FaBuilding className="h-7 w-7" />
                    ) : (
                      <FaUser className="h-7 w-7" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 leading-tight text-lg mb-2 group-hover:text-[#0f70b7] transition-colors">
                      {partner.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {partner.type && (
                        <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-[#0f70b7] to-blue-600 px-3 py-1 rounded-full shadow-sm">
                          {partner.type}
                        </span>
                      )}
                      {partner.title && (
                        <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-[#63b32e] to-green-600 px-3 py-1 rounded-full shadow-sm">
                          {partner.title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>


                {partner.contact && (
                  <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-100 rounded-lg px-3 py-2 mb-2">
                    <span className="text-lg">📞</span>
                    <span className="font-medium">{partner.contact}</span>
                  </div>
                )}

                {partner.company && (
                  <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-100 rounded-lg px-3 py-2 mb-2">
                    <span className="text-lg">🏢</span>
                    <span className="font-medium">{partner.company}</span>
                  </div>
                )}

                {partner.category && (
                  <div className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-2 rounded-lg mb-2">
                    {partner.category}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-slate-600 mt-4 pt-4 border-t border-slate-200">
                  <FaMapMarkerAlt className="h-4 w-4 text-[#63b32e]" />
                  <span className="font-semibold">{regionNames[partner.region]}</span>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Rejoignez notre réseau
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
            Ensemble, construisons un avenir durable pour la RDC
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/contact"
              className="rounded-md bg-[#0f70b7] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#085a96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f70b7]"
            >
              Devenir Partenaire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
