import React from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { useLanguage } from '../contexts/LanguageContext'

const blogItems = [
    { title: 'Programme cacao durable 2025', tag: 'Formation', date: 'Jan 2025' },
    { title: "Lancement d'un nouveau projet communautaire", tag: 'Communauté', date: 'Dec 2024' },
    { title: 'Guide pratique crédit carbone', tag: 'Carbone', date: 'Nov 2024' },
]

export function Blog() {
    const { t } = useLanguage()
    
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-6xl px-6 py-6 sm:py-10">
                <SectionTitle kicker={t('blog.index.hero.kicker')} title={t('blog.index.hero.title')} />
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
