```javascript
import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../../components/SectionTitle'
import { FaHandshake, FaGlobeAfrica, FaUniversity, FaIndustry, FaSeedling, FaLightbulb, FaChartLine } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

export function Partners() {
    const { t } = useLanguage()

    const strategicPartners = t('about.partners.strategic.items')
    const localPartners = t('about.partners.local.items')
    const technicalPartners = t('about.partners.technical.items')
    const privatePartners = t('about.partners.private.items')
    const benefits = t('about.partners.benefits.items')

    const benefitIcons = [FaChartLine, FaGlobeAfrica, FaHandshake, FaLightbulb]

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f70b7] to-[#63b32e] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t('about.partners.hero.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
                            {t('about.partners.hero.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Intro */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <SectionTitle
                        kicker={t('about.partners.intro.kicker')}
                        title={t('about.partners.intro.title')}
                    >
                        {t('about.partners.intro.text')}
                    </SectionTitle>
                </div>

                {/* Strategic Partners */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-[#0f70b7] pl-4">
                        {t('about.partners.strategic.title')}
                    </h2>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {Array.isArray(strategicPartners) && strategicPartners.map((partner) => (
                            <div key={partner.name} className="flex flex-col rounded-2xl border-2 border-slate-100 bg-white p-8 shadow-lg transition hover:border-blue-100 hover:shadow-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#0f70b7]/10 text-[#0f70b7]">
                                        <FaGlobeAfrica className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold leading-tight text-slate-900">{partner.name}</h3>
                                        <span className="text-sm font-semibold text-[#0f70b7]">{partner.acronym}</span>
                                    </div>
                                </div>
                                <div className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5">{partner.type}</span>
                                </div>
                                <p className="mb-6 flex-auto text-slate-600">{partner.desc}</p>
                                <div className="border-t border-slate-100 pt-4">
                                    <h4 className="mb-2 text-sm font-semibold text-slate-900">Domaines de coopération:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {partner.focus && partner.focus.map((item) => (
                                            <span key={item} className="text-xs font-medium text-[#0f70b7] bg-blue-50 px-2 py-1 rounded">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Local & National Partners */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-[#63b32e] pl-4">
                        {t('about.partners.local.title')}
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {Array.isArray(localPartners) && localPartners.map((partner) => (
                            <div key={partner.name} className="group relative rounded-xl bg-slate-50 p-6 hover:bg-[#63b32e] hover:shadow-lg transition duration-300">
                                <div className="mb-4 text-[#63b32e] group-hover:text-white transition-colors">
                                    <FaUniversity className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white mb-2 transition-colors">
                                    {partner.name}
                                </h3>
                                <p className="text-sm text-slate-500 group-hover:text-white/80 mb-3 transition-colors">{partner.type}</p>
                                <p className="text-xs text-slate-600 group-hover:text-white/90 transition-colors border-t border-slate-200 group-hover:border-white/20 pt-2">
                                    {partner.collab}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Technical Partners */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-orange-400 pl-4">
                        {t('about.partners.technical.title')}
                    </h2>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow">
                        <div className="grid divide-y divide-slate-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                            {Array.isArray(technicalPartners) && technicalPartners.map((partner) => (
                                <div key={partner.name} className="p-8 sm:p-10 hover:bg-slate-50 transition">
                                    <div className="flex items-center gap-x-4 mb-4">
                                        <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                                            <FaSeedling className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900">{partner.name}</h3>
                                    </div>
                                    <dl className="space-y-2">
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expertise</dt>
                                            <dd className="text-sm text-slate-900">{partner.expertise}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contribution</dt>
                                            <dd className="text-sm text-slate-900">{partner.contrib}</dd>
                                        </div>
                                    </dl>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Private Sector */}
                <div className="mb-20 rounded-3xl bg-slate-900 px-6 py-16 sm:p-16">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            {t('about.partners.private.title')}
                        </h2>
                        <p className="mt-4 text-lg text-slate-300">
                            {t('about.partners.private.text')}
                        </p>
                    </div>
                    <div className="mx-auto mt-12 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
                        {Array.isArray(privatePartners) && privatePartners.map((partner) => (
                            <div key={partner} className="col-span-1 flex justify-center bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                                <span className="text-white font-bold text-sm text-center">{partner}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle
                            kicker={t('about.partners.benefits.kicker')}
                            title={t('about.partners.benefits.title')}
                        />
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.isArray(benefits) && benefits.map((benefit, index) => {
                            const Icon = benefitIcons[index]
                            return (
                                <div key={benefit.title} className="text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-[#63b32e] mb-4">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-slate-600">{benefit.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {t('about.partners.cta.title')}
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
                        {t('about.partners.cta.text')}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/contact"
                            className="rounded-md bg-[#0f70b7] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#085a96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f70b7]"
                        >
                            {t('about.partners.cta.btn')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
```
