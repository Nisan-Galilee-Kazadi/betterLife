import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../../components/SectionTitle";
import {
  FaHandshake,
  FaMapMarkerAlt,
  FaUser,
  FaUsers,
  FaBuilding,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function Partners() {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Progression data - partenaires par année, mois et province (2021-2026)
  const progressionData = [
    {
      year: 2021,
      months: [
        {
          month: "Juin",
          provinces: {
            "haut-katanga": 3,
            "kongo-central": 2,
            "kinshasa": 4,
            "autres": 1
          },
          total: 10
        },
        {
          month: "Juillet",
          provinces: {
            "haut-katanga": 7,
            "kongo-central": 6,
            "kinshasa": 9,
            "autres": 2
          },
          total: 24
        },
        {
          month: "Août",
          provinces: {
            "haut-katanga": 10,
            "kongo-central": 9,
            "kinshasa": 14,
            "autres": 3
          },
          total: 36
        },
        {
          month: "Septembre",
          provinces: {
            "haut-katanga": 13,
            "kongo-central": 12,
            "kinshasa": 18,
            "autres": 4
          },
          total: 47
        },
        {
          month: "Octobre",
          provinces: {
            "haut-katanga": 16,
            "kongo-central": 15,
            "kinshasa": 21,
            "autres": 5
          },
          total: 57
        },
        {
          month: "Novembre",
          provinces: {
            "haut-katanga": 18,
            "kongo-central": 18,
            "kinshasa": 24,
            "autres": 6
          },
          total: 66
        },
        {
          month: "Décembre",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        }
      ]
    },
    {
      year: 2022,
      months: [
        {
          month: "Janvier",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Février",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Mars",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Avril",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Mai",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Juin",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Juillet",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Août",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Septembre",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Octobre",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Novembre",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Décembre",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        }
      ]
    },
    {
      year: 2023,
      months: [
        {
          month: "Janvier",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Février",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Mars",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Avril",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Mai",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Juin",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        }
      ]
    },
    {
      year: 2024,
      months: [
        {
          month: "Janvier",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Février",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Mars",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Avril",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Mai",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Juin",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        }
      ]
    },
    {
      year: 2025,
      months: [
        {
          month: "Janvier",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Février",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Mars",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Avril",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Mai",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        },
        {
          month: "Juin",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        }
      ]
    },
    {
      year: 2026,
      months: [
        {
          month: "Janvier",
          provinces: {
            "haut-katanga": 21,
            "kongo-central": 20,
            "kinshasa": 26,
            "autres": 8
          },
          total: 75
        }
      ]
    }
  ];

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

      {/* Progression Chart Section */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <SectionTitle
              kicker="Croissance"
              title="Charte de Progression"
            >
              Évolution de notre réseau de partenaires par année, mois et province
            </SectionTitle>
          </div>

          {progressionData.map((yearData) => (
            <div key={yearData.year} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <FaCalendarAlt className="text-[#0f70b7] text-2xl" />
                <h3 className="text-2xl font-bold text-slate-900">{yearData.year}</h3>
                <div className="h-px bg-gradient-to-r from-[#63b32e] to-[#0f70b7] flex-1"></div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {yearData.months.map((monthData, index) => (
                  <div
                    key={monthData.month}
                    className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-slate-900">{monthData.month}</h4>
                      <div className="flex items-center gap-2">
                        <FaChartLine className="text-[#63b32e]" />
                        <span className="text-2xl font-bold text-[#0f70b7]">{monthData.total}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {Object.entries(monthData.provinces).map(([province, count]) => (
                        <div key={province} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-[#63b32e] text-sm" />
                            <span className="text-sm font-medium text-slate-700 capitalize">
                              {province.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-[#63b32e] to-[#0f70b7] h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(count / monthData.total) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-900 w-8 text-right">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Croissance mensuelle</span>
                        <span className="font-semibold text-[#63b32e]">
                          {index > 0 
                            ? `+${monthData.total - yearData.months[index - 1].total}`
                            : 'Initial'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Summary Statistics */}
          <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Résumé de la Progression</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0f70b7] mb-2">
                  {progressionData[progressionData.length - 1].months[progressionData[progressionData.length - 1].months.length - 1].total}
                </div>
                <div className="text-sm font-semibold text-slate-700">Total Actuel</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#63b32e] mb-2">
                  +{progressionData[progressionData.length - 1].months[progressionData[progressionData.length - 1].months.length - 1].total - progressionData[0].months[0].total}
                </div>
                <div className="text-sm font-semibold text-slate-700">Croissance Totale</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#63b32e] mb-2">
                  {Math.round(((progressionData[progressionData.length - 1].months[progressionData[progressionData.length - 1].months.length - 1].total - progressionData[0].months[0].total) / progressionData[0].months[0].total) * 100)}%
                </div>
                <div className="text-sm font-semibold text-slate-700">Pourcentage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0f70b7] mb-2">
                  {progressionData.length}
                </div>
                <div className="text-sm font-semibold text-slate-700">Années Suivies</div>
              </div>
            </div>
          </div>

          {/* Chart.js Graphs Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Visualisations Avancées</h3>
              <p className="text-lg text-slate-600">Graphiques interactifs pour analyser l'évolution de notre réseau</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Line Chart - Évolution temporelle */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Évolution Mensuelle</h4>
                <div className="h-80">
                  <Line
                    data={{
                      labels: progressionData.flatMap(year => 
                        year.months.map(month => `${month.month.substring(0, 3)} ${year.year}`)
                      ),
                      datasets: [
                        {
                          label: 'Total Partenaires',
                          data: progressionData.flatMap(year => year.months.map(month => month.total)),
                          borderColor: '#0f70b7',
                          backgroundColor: 'rgba(15, 112, 183, 0.1)',
                          tension: 0.4,
                          fill: true,
                        },
                        {
                          label: 'Haut-Katanga',
                          data: progressionData.flatMap(year => year.months.map(month => month.provinces['haut-katanga'])),
                          borderColor: '#63b32e',
                          backgroundColor: 'rgba(99, 179, 46, 0.1)',
                          tension: 0.4,
                          fill: false,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          mode: 'index',
                          intersect: false,
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Nombre de Partenaires'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Bar Chart - Comparaison par province */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Comparaison par Province (2021-2026)</h4>
                <div className="h-80">
                  <Bar
                    data={{
                      labels: ['Haut-Katanga', 'Kongo Central', 'Kinshasa', 'Autres'],
                      datasets: [
                        {
                          label: '2021',
                          data: [
                            progressionData[0].months[progressionData[0].months.length - 1].provinces['haut-katanga'],
                            progressionData[0].months[progressionData[0].months.length - 1].provinces['kongo-central'],
                            progressionData[0].months[progressionData[0].months.length - 1].provinces['kinshasa'],
                            progressionData[0].months[progressionData[0].months.length - 1].provinces['autres']
                          ],
                          backgroundColor: 'rgba(15, 112, 183, 0.6)',
                        },
                        {
                          label: '2022',
                          data: [
                            progressionData[1].months[progressionData[1].months.length - 1].provinces['haut-katanga'],
                            progressionData[1].months[progressionData[1].months.length - 1].provinces['kongo-central'],
                            progressionData[1].months[progressionData[1].months.length - 1].provinces['kinshasa'],
                            progressionData[1].months[progressionData[1].months.length - 1].provinces['autres']
                          ],
                          backgroundColor: 'rgba(30, 136, 229, 0.6)',
                        },
                        {
                          label: '2023',
                          data: [
                            progressionData[2].months[progressionData[2].months.length - 1].provinces['haut-katanga'],
                            progressionData[2].months[progressionData[2].months.length - 1].provinces['kongo-central'],
                            progressionData[2].months[progressionData[2].months.length - 1].provinces['kinshasa'],
                            progressionData[2].months[progressionData[2].months.length - 1].provinces['autres']
                          ],
                          backgroundColor: 'rgba(66, 165, 245, 0.6)',
                        },
                        {
                          label: '2024',
                          data: [
                            progressionData[3].months[progressionData[3].months.length - 1].provinces['haut-katanga'],
                            progressionData[3].months[progressionData[3].months.length - 1].provinces['kongo-central'],
                            progressionData[3].months[progressionData[3].months.length - 1].provinces['kinshasa'],
                            progressionData[3].months[progressionData[3].months.length - 1].provinces['autres']
                          ],
                          backgroundColor: 'rgba(99, 179, 46, 0.6)',
                        },
                        {
                          label: '2025',
                          data: [
                            progressionData[4].months[progressionData[4].months.length - 1].provinces['haut-katanga'],
                            progressionData[4].months[progressionData[4].months.length - 1].provinces['kongo-central'],
                            progressionData[4].months[progressionData[4].months.length - 1].provinces['kinshasa'],
                            progressionData[4].months[progressionData[4].months.length - 1].provinces['autres']
                          ],
                          backgroundColor: 'rgba(76, 175, 80, 0.6)',
                        },
                        {
                          label: '2026',
                          data: [
                            progressionData[5].months[progressionData[5].months.length - 1].provinces['haut-katanga'],
                            progressionData[5].months[progressionData[5].months.length - 1].provinces['kongo-central'],
                            progressionData[5].months[progressionData[5].months.length - 1].provinces['kinshasa'],
                            progressionData[5].months[progressionData[5].months.length - 1].provinces['autres']
                          ],
                          backgroundColor: 'rgba(102, 187, 106, 0.6)',
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Nombre de Partenaires'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Doughnut Chart - Répartition actuelle */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Répartition Actuelle (Juin 2026)</h4>
                <div className="h-80">
                  <Doughnut
                    data={{
                      labels: ['Haut-Katanga', 'Kongo Central', 'Kinshasa', 'Autres'],
                      datasets: [
                        {
                          data: [
                            progressionData[5].months[progressionData[5].months.length - 1].provinces['haut-katanga'],
                            progressionData[5].months[progressionData[5].months.length - 1].provinces['kongo-central'],
                            progressionData[5].months[progressionData[5].months.length - 1].provinces['kinshasa'],
                            progressionData[5].months[progressionData[5].months.length - 1].provinces['autres']
                          ],
                          backgroundColor: [
                            '#63b32e',
                            '#0f70b7',
                            '#1e88e5',
                            '#42a5f5'
                          ],
                          borderWidth: 2,
                          borderColor: '#ffffff'
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              const total = context.dataset.data.reduce((a, b) => a + b, 0);
                              const percentage = ((context.parsed / total) * 100).toFixed(1);
                              return `${context.label}: ${context.parsed} (${percentage}%)`;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Combined Chart - Croissance mensuelle */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Croissance Mensuelle</h4>
                <div className="h-80">
                  <Bar
                    data={{
                      labels: progressionData.flatMap(year => 
                        year.months.slice(1).map((month, index) => 
                          `${month.month.substring(0, 3)} ${year.year}`
                        )
                      ),
                      datasets: [
                        {
                          label: 'Nouveaux Partenaires',
                          data: progressionData.flatMap(year => 
                            year.months.slice(1).map((month, index) => 
                              month.total - year.months[index].total
                            )
                          ),
                          backgroundColor: [
                            '#0f70b7',
                            '#1e88e5',
                            '#42a5f5',
                            '#90caf9',
                            '#63b32e',
                            '#4caf50',
                            '#66bb6a',
                            '#81c784'
                          ],
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Nouveaux Partenaires'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
