import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../../components/SectionTitle'
import { useLanguage } from '../../contexts/LanguageContext'
import team_hero from "../../images/team_hero.webp";
import rhPhoto from "../../images/Rh.jpg";
import gestionProjetPhoto from "../../images/Gp.jpg";
import secretariatPhoto from "../../images/Sec.jpg";
import dircomPhoto from "../../images/dircom.jpg";
import financierePhoto from "../../images/finaciere.jpg";

export function Team() {
    const { t } = useLanguage()

    const teamMembers = t('about.team.members')
    const advisoryBoard = t('about.team.advisory.members')
    const ctaItems = t('about.team.cta.items')

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-zinc-900 py-32 sm:py-48">
                <img
                    src={team_hero}
                    alt="Our Team"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                            {t('about.team.hero.title')}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-white font-medium drop-shadow-xl">
                            {t('about.team.hero.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Team */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <SectionTitle
                        kicker={t('about.team.leadership.kicker')}
                        title={t('about.team.leadership.title')}
                    >
                        {t('about.team.leadership.text')}
                    </SectionTitle>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
                    {Array.isArray(teamMembers) && teamMembers.map((member) => (
                        <div key={member.name} className="rounded-t-2xl bg-white shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/20 overflow-hidden">
                            {/* Photo en haut avec padding */}
                            <div className="p-2 pt-2">
                                <div className="w-full h-56 md:h-96 overflow-hidden rounded-t-xl">
                                    {member.role.includes('RH') || member.role.includes('Ressources Humaines') ? (
                                        <img
                                            src={rhPhoto}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    ) : member.role.includes('Gestionnaire') || member.role.includes('Gestion') ? (
                                        <img
                                            src={gestionProjetPhoto}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-[center_40%]"
                                        />
                                    ) : member.role.includes('Secrétaire') || member.role.includes('Secrétariat') ? (
                                        <img
                                            src={secretariatPhoto}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-[center_30%]"
                                        />
                                    ) : member.role.includes('Communication') || member.role.includes('Marketing') ? (
                                        <img
                                            src={dircomPhoto}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    ) : member.role.includes('Finance') || member.role.includes('Financière') || member.role.includes('Comptabilité') ? (
                                        <img
                                            src={financierePhoto}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#63b32e] to-[#0f70b7] flex items-center justify-center text-white text-3xl font-bold">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Contenu */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-[#63b32e] font-semibold text-center mb-4">
                                    {member.role}
                                </p>
                                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                    {member.bio}
                                </p>

                                {/* Expertise Tags */}
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {member.expertise && member.expertise.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-green-50 text-[#63b32e] text-xs font-medium rounded-full border border-green-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-500 font-semibold text-center mb-4 pt-5">
                                    {member.mail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Advisory Board - Temporarily Commented */}
                {/* <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle
                            kicker={t('about.team.advisory.kicker')}
                            title={t('about.team.advisory.title')}
                        >
                            {t('about.team.advisory.text')}
                        </SectionTitle>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {Array.isArray(advisoryBoard) && advisoryBoard.map((advisor) => (
                            <div key={advisor.name} className="rounded-xl border-2 border-blue-100 bg-blue-50 p-6 text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0f70b7] to-[#63b32e] mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                                    {advisor.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">{advisor.name}</h3>
                                <p className="text-sm text-[#0f70b7] font-semibold mb-2">{advisor.role}</p>
                                <p className="text-xs text-slate-600">{advisor.org}</p>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Provincial Delegates Section */}
                <div className="mt-16 pb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Délégués Provinciaux
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Nos délégués représentent Better Life dans les six provinces de la République Démocratique du Congo,
                            assurant la coordination de nos actions sur tout le territoire national.
                        </p>s
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                name: "Justin Ngandu",
                                province: "Grand Katanga",
                                role: "Délégué Provincial",
                                bio: "Supervise les actions de Better Life dans la région du Grand Katanga, avec un focus sur le développement durable et l'agriculture.",
                                expertise: ["Développement", "Coordination", "Agriculture"],
                                mail: "admin-lushi@betterlife-ong.org"
                            },
                            {
                                name: "À préciser",
                                province: "Kongo Central",
                                role: "Délégué Provincial",
                                bio: "Coordination des programmes environnementaux et agricoles dans la province du Kongo Central.",
                                expertise: ["Environnement", "Gestion", "Développement"],
                                mail: "boma@betterlife-ong.org"
                            },
                            {
                                name: "À préciser",
                                province: "Grand Bandundu",
                                role: "Délégué Provincial",
                                bio: "Responsable de la mise en œuvre des initiatives communautaires dans la région du Grand Bandundu.",
                                expertise: ["Communauté", "Agriculture", "Projets"],
                                mail: "grad-bandundu@betterlife-ong.org"
                            },
                            {
                                name: "À préciser",
                                province: "Grand Oriental",
                                role: "Délégué Provincial",
                                bio: "Supervise le développement des programmes de conservation et de sécurité alimentaire dans le Grand Oriental.",
                                expertise: ["Conservation", "Sécurité Alimentaire", "Terrain"],
                                mail: "grand-oriental@betterlife-ong.org"
                            },
                            {
                                name: "À préciser",
                                province: "Grand Kasaï",
                                role: "Délégué Provincial",
                                bio: "Coordination des actions de reboisement et de soutien aux agriculteurs dans la zone du Grand Kasaï.",
                                expertise: ["Reboisement", "Soutien Agricole", "Impact"],
                                mail: "grand-kasai@betterlife-ong.org"
                            }
                        ].map((delegate, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                            >
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#63b32e]/5 to-[#0f70b7]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

                                <div className="relative p-8">
                                    {/* Province Badge */}
                                    <div className="flex justify-center mb-4">
                                        <span className="px-4 py-2 bg-gradient-to-r from-[#0f70b7] to-[#63b32e] text-white text-sm font-semibold rounded-full">
                                            {delegate.province}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-slate-900 text-center mb-2">{delegate.name}</h3>
                                    <p className="text-sm text-[#0f70b7] font-semibold text-center mb-4">{delegate.role}</p>

                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                        {delegate.bio}
                                    </p>

                                    {/* Expertise Tags */}
                                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                                        {delegate.expertise.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="px-3 py-1 bg-green-50 text-[#63b32e] text-xs font-medium rounded-full border border-green-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Contact Info */}
                                    <div className="text-center">
                                        <p className="text-gray-500 font-semibold text-sm">
                                            {delegate.mail}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Join Us Section */}
                <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12">
                    <div className="grid gap-8 lg:grid-cols-2 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                {t('about.team.cta.title')}
                            </h2>
                            <p className="text-lg text-white/90 mb-6">
                                {t('about.team.cta.text')}
                            </p>
                            <div className="space-y-3">
                                {Array.isArray(ctaItems) && ctaItems.map((type) => (
                                    <div key={type} className="flex items-center gap-3 text-white">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center lg:text-right">
                            <Link
                                to="/rejoindre"
                                className="inline-block rounded-md bg-white px-8 py-4 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
                            >
                                {t('about.team.cta.btn')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
