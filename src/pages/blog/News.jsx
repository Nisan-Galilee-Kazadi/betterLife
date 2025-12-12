import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../../components/SectionTitle'
import { FaTree, FaHandshake, FaGraduationCap, FaCheckCircle, FaHammer, FaTrophy, FaCalendar, FaUser } from 'react-icons/fa'

export function BlogNews() {
    const news = [
        {
            title: 'Lancement du Programme de Reboisement 2025',
            date: '5 Décembre 2024',
            category: 'Annonce',
            icon: FaTree,
            excerpt: 'Better Life annonce le lancement de son ambitieux programme de plantation de 1 million d\'arbres pour l\'année 2025.',
            content: 'Dans le cadre de notre engagement pour la lutte contre le changement climatique, nous lançons notre plus grand programme de reboisement à ce jour...',
            author: 'Équipe Better Life'
        },
        {
            title: 'Partenariat Stratégique avec le PNUE',
            date: '28 Novembre 2024',
            category: 'Partenariat',
            icon: FaHandshake,
            excerpt: 'Signature d\'un accord de partenariat avec le Programme des Nations Unies pour l\'Environnement pour renforcer nos actions.',
            content: 'Ce partenariat stratégique permettra de décupler notre impact en matière de conservation de la biodiversité...',
            author: 'Direction Générale'
        },
        {
            title: 'Formation de 500 Agriculteurs à Kikwit',
            date: '15 Novembre 2024',
            category: 'Formation',
            icon: FaGraduationCap,
            excerpt: 'Succès de notre programme de formation en agriculture climato-intelligente avec 500 agriculteurs formés.',
            content: 'Durant trois semaines intensives, nos experts ont formé 500 agriculteurs aux techniques modernes d\'agriculture durable...',
            author: 'Département Agriculture'
        },
        {
            title: 'Certification Bio pour 150 Producteurs',
            date: '2 Novembre 2024',
            category: 'Réussite',
            icon: FaCheckCircle,
            excerpt: '150 producteurs accompagnés par Better Life obtiennent leur certification agriculture biologique.',
            content: 'C\'est une grande fierté pour nous de voir ces producteurs obtenir leur certification bio après 2 ans d\'accompagnement...',
            author: 'Équipe Certification'
        },
        {
            title: 'Nouvelle Pépinière à Mbandaka',
            date: '20 Octobre 2024',
            category: 'Infrastructure',
            icon: FaHammer,
            excerpt: 'Inauguration de notre nouvelle pépinière capable de produire 600,000 plants par an.',
            content: 'Cette nouvelle infrastructure renforce notre capacité de production et nous rapproche de notre objectif de 1.5 million d\'arbres...',
            author: 'Département Reboisement'
        },
        {
            title: 'Prix d\'Excellence Environnementale 2024',
            date: '10 Octobre 2024',
            category: 'Reconnaissance',
            icon: FaTrophy,
            excerpt: 'Better Life reçoit le Prix d\'Excellence Environnementale décerné par le Ministère de l\'Environnement.',
            content: 'Cette reconnaissance récompense nos efforts constants pour la protection de l\'environnement et le développement durable...',
            author: 'Communication'
        }
    ]

    const categories = ['Tous', 'Annonce', 'Partenariat', 'Formation', 'Réussite', 'Infrastructure', 'Reconnaissance']

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f70b7] to-[#63b32e] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Actualités
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
                            Restez informés de nos dernières actions et réalisations
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Categories Filter */}
                <div className="mb-12 flex flex-wrap gap-3 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="px-6 py-2 rounded-full bg-slate-100 text-slate-700 font-semibold hover:bg-green-100 hover:text-[#63b32e] transition"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured News */}
                <div className="mb-16">
                    {(() => {
                        const FeaturedIcon = news[0].icon;
                        return (
                            <div className="rounded-3xl bg-gradient-to-br from-[#0f70b7] to-[#63b32e] p-8 text-white">
                                <div className="grid gap-8 lg:grid-cols-2 items-center">
                                    <div>
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                                            À la Une
                                        </span>
                                        <h2 className="text-3xl font-bold mt-4 mb-4">{news[0].title}</h2>
                                        <p className="text-white/90 mb-6">{news[0].excerpt}</p>
                                        <div className="flex items-center gap-4 text-sm text-white/80">
                                            <span className="flex items-center gap-2">
                                                <FaCalendar />
                                                {news[0].date}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <FaUser />
                                                {news[0].author}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <FeaturedIcon className="text-9xl text-white/90" />
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* News Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {news.slice(1).map((article) => {
                        const ArticleIcon = article.icon;
                        return (
                            <div key={article.title} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/20">
                                <ArticleIcon className="text-7xl mb-4 text-[#63b32e] mx-auto" />

                                <div className="mb-4">
                                    <span className="px-3 py-1 bg-green-100 text-[#63b32e] rounded-full text-xs font-semibold">
                                        {article.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {article.title}
                                </h3>

                                <p className="text-slate-600 mb-4 text-sm">
                                    {article.excerpt}
                                </p>

                                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <FaCalendar />
                                        {article.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaUser />
                                        {article.author}
                                    </span>
                                </div>

                                <button className="w-full rounded-lg bg-[#0f70b7] text-white py-2 font-semibold hover:bg-[#0d5a94] transition">
                                    Lire la suite →
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Newsletter Subscription */}
                <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Restez Informés
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Inscrivez-vous à notre newsletter pour recevoir nos actualités directement dans votre boîte mail
                    </p>
                    <div className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Votre adresse email"
                            className="flex-1 rounded-lg px-4 py-3 text-slate-900"
                        />
                        <button className="rounded-lg bg-white px-6 py-3 font-semibold text-[#63b32e] hover:bg-slate-50 transition">
                            S'inscrire
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
