import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../../components/SectionTitle'
import { FaSeedling, FaHandsHelping, FaLightbulb, FaStar, FaGlobeAmericas, FaGem } from 'react-icons/fa'
import { MdNaturePeople, MdEco, MdGroups, MdTrendingUp } from 'react-icons/md'
import { useLanguage } from '../../contexts/LanguageContext'

export function Mission() {
    const { t } = useLanguage()

    const valueIcons = [FaSeedling, FaGem, FaHandsHelping, FaLightbulb, FaGlobeAmericas, FaStar]
    const impactIcons = [MdEco, FaSeedling, MdNaturePeople, MdGroups]
    const impactColors = ['green', 'blue', 'green', 'blue']

    const values = t('about.mission.values.items')
    const impactAreas = t('about.mission.impact.items')

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f70b7] to-[#63b32e] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t('about.mission.hero.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
                            {t('about.mission.hero.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Vision & Mission */}
                <div className="grid gap-12 lg:grid-cols-2 mb-20">
                    <div className="space-y-6">
                        <SectionTitle kicker={t('about.mission.vision.kicker')} title={t('about.mission.vision.title')}>
                            {t('about.mission.vision.text')}
                        </SectionTitle>
                        <p className="text-lg text-slate-600">
                            {t('about.mission.vision.desc')}
                        </p>
                    </div>
                    <div className="space-y-6">
                        <SectionTitle kicker={t('about.mission.mission.kicker')} title={t('about.mission.mission.title')}>
                            {t('about.mission.mission.text')}
                        </SectionTitle>
                        <p className="text-lg text-slate-600">
                            {t('about.mission.mission.desc')}
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker={t('about.mission.values.kicker')} title={t('about.mission.values.title')} />
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.isArray(values) && values.map((value, index) => {
                            const Icon = valueIcons[index]
                            return (
                                <div key={index} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/20">
                                    <Icon className="text-5xl mb-4 text-[#63b32e]" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                                    <p className="text-slate-600">{value.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Impact Areas */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker={t('about.mission.impact.kicker')} title={t('about.mission.impact.title')} />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {Array.isArray(impactAreas) && impactAreas.map((area, index) => {
                            const Icon = impactIcons[index]
                            const color = impactColors[index]
                            return (
                                <div key={index} className={`rounded-2xl border-2 ${color === 'green' ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'} p-8`}>
                                    <Icon className={`text-4xl mb-4 ${color === 'green' ? 'text-[#63b32e]' : 'text-[#0f70b7]'}`} />
                                    <h3 className={`text-2xl font-bold mb-4 ${color === 'green' ? 'text-[#63b32e]' : 'text-[#0f70b7]'}`}>
                                        {area.title}
                                    </h3>
                                    <p className="text-slate-700 text-lg">{area.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="rounded-3xl bg-gradient-to-r from-[#63b32e] to-[#0f70b7] p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {t('about.mission.cta.title')}
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {t('about.mission.cta.text')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/rejoindre"
                            className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
                        >
                            {t('about.mission.cta.btn_volunteer')}
                        </Link>
                        <Link
                            to="/contact"
                            className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
                        >
                            {t('about.mission.cta.btn_contact')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
