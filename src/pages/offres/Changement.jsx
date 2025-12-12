import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../../components/SectionTitle'
import { FaCloudRain, FaSun, FaThermometerHalf, FaChartLine, FaShieldAlt, FaWater } from 'react-icons/fa'
import { GiFarmer, GiPlantRoots } from 'react-icons/gi'
import { MdScience } from 'react-icons/md'
import { useLanguage } from '../../contexts/LanguageContext'

// Icons mapping for challenges
const challengeIcons = {
    0: FaCloudRain,
    1: FaSun,
    2: FaThermometerHalf,
    3: FaShieldAlt
}

// Icons mapping for technologies
const techIcons = {
    0: GiPlantRoots,
    1: FaWater,
    2: GiFarmer,
    3: MdScience,
    4: FaChartLine,
    5: FaShieldAlt
}

export function OffreChangement() {
    const { t } = useLanguage()

    // Helper to get packages array
    const packages = [
        { ...t('offres.changement.packages.items.0'), popular: false },
        { ...t('offres.changement.packages.items.1'), popular: true },
        { ...t('offres.changement.packages.items.2'), popular: false }
    ]

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#63b32e] to-[#0f70b7] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-4">{t('offres.changement.hero.tag')}</p>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t('offres.changement.hero.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
                            {t('offres.changement.hero.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Packages */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker={t('offres.changement.packages.kicker')} title={t('offres.changement.packages.title')} />
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {packages.map((pkg, index) => (
                            <div key={index} className={`rounded-3xl p-8 ${pkg.popular ? 'ring-4 ring-[#0f70b7] shadow-2xl scale-105' : 'ring-1 ring-slate-200 shadow-lg'} bg-white relative`}>
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-[#0f70b7] text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            {t('offres.common.recommended')}
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                                <p className="text-slate-600 mb-6">{pkg.description}</p>
                                <div className="mb-8 hidden">
                                    <span className="text-4xl font-bold text-[#63b32e]">{pkg.price}</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-[#63b32e] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/contact"
                                    className={`block w-full text-center rounded-lg px-6 py-3 font-semibold transition ${pkg.popular ? 'bg-[#0f70b7] text-white hover:bg-[#0d5a94]' : 'bg-[#63b32e] text-white hover:bg-[#529624]'}`}
                                >
                                    {t('offres.common.subscribe')}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Climate Challenges */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker={t('offres.changement.challenges.kicker')} title={t('offres.changement.challenges.title')} />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {t('offres.changement.challenges.items').map((challenge, index) => {
                            const Icon = challengeIcons[index] || FaCloudRain
                            return (
                                <div key={index} className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 text-center">
                                    <Icon className="text-5xl mb-4 text-[#0f70b7] mx-auto" />
                                    <h3 className="font-bold text-slate-900 mb-2">{challenge.title}</h3>
                                    <p className="text-sm text-slate-600">{challenge.impact}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Technologies */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker={t('offres.changement.technologies.kicker')} title={t('offres.changement.technologies.title')} />
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {t('offres.changement.technologies.items').map((tech, index) => {
                            const Icon = techIcons[index] || GiPlantRoots
                            return (
                                <div key={index} className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
                                    <Icon className="text-5xl mb-4 text-[#63b32e]" />
                                    <h3 className="font-bold text-slate-900 mb-2">{tech.title}</h3>
                                    <p className="text-sm text-slate-600">{tech.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Impact Stats */}
                <div className="mb-20 rounded-3xl bg-gradient-to-br from-green-50 to-blue-50 p-12 border-2 border-green-200">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">{t('offres.changement.impact.title')}</h2>
                    <div className="grid gap-8 md:grid-cols-4">
                        {[
                            { number: '+45%', label: t('offres.changement.impact.items.0.label'), color: 'green' },
                            { number: '-60%', label: t('offres.changement.impact.items.1.label'), color: 'blue' },
                            { number: '+80%', label: t('offres.changement.impact.items.2.label'), color: 'green' },
                            { number: '2x', label: t('offres.changement.impact.items.3.label'), color: 'blue' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className={`text-4xl font-bold mb-2 ${stat.color === 'green' ? 'text-[#63b32e]' : 'text-[#0f70b7]'}`}>
                                    {stat.number}
                                </p>
                                <p className="text-slate-700">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="rounded-3xl bg-gradient-to-r from-[#63b32e] to-[#0f70b7] p-12 text-center">
                    <FaThermometerHalf className="text-7xl text-white mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {t('offres.changement.cta.title')}
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {t('offres.changement.cta.text')}
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block rounded-md bg-white px-8 py-4 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
                    >
                        {t('offres.changement.cta.btn')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
