import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../../components/SectionTitle'
import { FaHandHoldingHeart, FaUsers, FaChild, FaFemale, FaGraduationCap, FaTint } from 'react-icons/fa'
import { GiWaterDrop, GiSprout, GiReceiveMoney, GiDiscussion, GiFarmer } from 'react-icons/gi'
import { MdEmojiPeople, MdVolunteerActivism } from 'react-icons/md'
import { useLanguage } from '../../context/LanguageContext'

export function ServiceCommunautaire() {
    const { t } = useLanguage()

    const programIcons = [GiReceiveMoney, FaGraduationCap, FaTint, GiSprout, MdVolunteerActivism, MdEmojiPeople]
    const womenStatsIcons = [FaFemale, FaGraduationCap, FaUsers, GiReceiveMoney]

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f70b7] to-[#63b32e] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t('services.communautaire.hero.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
                            {t('services.communautaire.hero.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Introduction */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <SectionTitle
                        kicker={t('services.communautaire.intro.kicker')}
                        title={t('services.communautaire.intro.title')}
                    >
                        {t('services.communautaire.intro.text')}
                    </SectionTitle>
                </div>

                {/* Programs Grid */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle
                            kicker={t('services.communautaire.programs.kicker')}
                            title={t('services.communautaire.programs.title')}
                        />
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {t('services.communautaire.programs.items').map((program, index) => {
                            const Icon = programIcons[index] || GiReceiveMoney
                            return (
                                <div key={index} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:translate-y-[-4px]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 rounded-lg bg-[#63b32e]/10">
                                            <Icon className="text-3xl text-[#63b32e]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">{program.title}</h3>
                                    </div>
                                    <p className="text-slate-600 mb-6">{program.desc}</p>
                                    <div className="pt-6 border-t border-slate-100">
                                        <p className="text-sm font-semibold text-[#0f70b7]">
                                            Impact: {program.impact}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Women Empowerment */}
                <div className="mb-20 rounded-3xl overflow-hidden bg-slate-900 text-white relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f70b7]/90 to-[#63b32e]/90 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                        alt="Femmes leaders"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    <div className="relative z-20 p-12 md:p-16">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">
                                    {t('services.communautaire.women.title')}
                                </h2>
                                <p className="text-lg text-white/90 mb-8">
                                    {t('services.communautaire.women.text')}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {t('services.communautaire.women.items').map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <blockquote className="border-l-4 border-white pl-6 italic">
                                    {t('services.communautaire.women.testimonial.text')}
                                    <footer className="mt-2 text-sm font-bold">
                                        {t('services.communautaire.women.testimonial.author')}
                                    </footer>
                                </blockquote>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {t('services.communautaire.women.stats').map((stat, index) => {
                                    const Icon = womenStatsIcons[index] || FaFemale
                                    return (
                                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                            <Icon className="text-4xl mb-3 text-white" />
                                            <p className="text-3xl font-bold mb-1">{stat.number}</p>
                                            <p className="text-sm text-white/80">{stat.label}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Stories */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle
                            kicker={t('services.communautaire.stories.kicker')}
                            title={t('services.communautaire.stories.title')}
                        />
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        {t('services.communautaire.stories.items').map((story, index) => (
                            <div key={index} className="rounded-2xl border-2 border-slate-100 p-8 shadow-sm hover:border-[#63b32e]/30 transition">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{story.title}</h3>
                                <p className="text-[#63b32e] font-semibold mb-4">{story.achievement}</p>
                                <p className="text-slate-600 mb-6">{story.desc}</p>
                                <div className="flex items-center gap-2 text-sm font-medium text-[#0f70b7]">
                                    <FaUsers />
                                    <span>{story.impact}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
                    <FaHandHoldingHeart className="text-7xl text-white mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {t('services.communautaire.cta.title')}
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {t('services.communautaire.cta.text')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/rejoindre"
                            className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
                        >
                            {t('services.communautaire.cta.btn_volunteer')}
                        </Link>
                        <Link
                            to="/contact"
                            className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/20"
                        >
                            {t('services.communautaire.cta.btn_donate')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
