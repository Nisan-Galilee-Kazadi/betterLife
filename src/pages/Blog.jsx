import React from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { useLanguage } from '../contexts/LanguageContext'
import blog_hero from '../images/planted-tree-farm.jpg'

const blogItems = [
    { title: 'Programme cacao durable 2025', tag: 'Formation', date: 'Jan 2025' },
    { title: "Lancement d'un nouveau projet communautaire", tag: 'Communauté', date: 'Dec 2024' },
    { title: 'Guide pratique crédit carbone', tag: 'Carbone', date: 'Nov 2024' },
]

export function Blog() {
    const { t } = useLanguage()

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32 mb-12">
                <img
                    src={blog_hero}
                    alt="NGO Blog & News"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-60"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
                            {t('blog.index.hero.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white font-medium drop-shadow-md">
                            {t('blog.index.hero.subtitle') || "Restez informé de nos actions et actualités sur le terrain."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-6 sm:py-10">
                <div className="text-center">
                    <SectionTitle kicker={t('blog.index.hero.kicker')} title={t('blog.index.hero.title')} />
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogItems.map((item) => (
                        <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">{item.tag}</p>
                            <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                            <p className="mt-1 text-xs text-slate-500">{item.date}</p>
                            <p className="mt-3 text-sm text-slate-600">
                                {t('blog.index.items.excerpt')}
                            </p>
                            <button className="mt-4 text-sm font-semibold text-sky-600 hover:text-sky-700">{t('blog.index.items.readMore')}</button>
                        </article>
                    ))}
                </div>
                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-800">{t('blog.index.sections.interviews.title')}</p>
                        <p className="mt-2 text-sm text-slate-600">
                            {t('blog.index.sections.interviews.desc')}
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-800">{t('blog.index.sections.campaigns.title')}</p>
                        <p className="mt-2 text-sm text-slate-600">
                            {t('blog.index.sections.campaigns.desc')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
