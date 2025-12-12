import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../../components/SectionTitle'
import { useLanguage } from '../../contexts/LanguageContext'

export function Team() {
    const { t } = useLanguage()

    const teamMembers = t('about.team.members')
    const advisoryBoard = t('about.team.advisory.members')
    const ctaItems = t('about.team.cta.items')

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#63b32e] to-[#0f70b7] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t('about.team.hero.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
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
                        <div key={member.name} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/20">
                            {/* Avatar Placeholder */}
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#63b32e] to-[#0f70b7] mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>

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
                        </div>
                    ))}
                </div>

                {/* Advisory Board */}
                <div className="mb-20">
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
