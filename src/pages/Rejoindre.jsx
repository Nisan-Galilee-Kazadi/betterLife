import React from 'react'
import { SectionTitle } from '../components/SectionTitle'

const joinCards = [
    { title: 'Producteurs', desc: 'Accompagnement technique, accès aux intrants, valorisation des récoltes.' },
    { title: 'Partenaires', desc: 'ONG, entreprises, bailleurs : co-construction de projets à impact.' },
    { title: 'Bénévoles / Stagiaires', desc: 'Opérations terrain, logistique, communication, recherche.' },
]

export function Rejoindre() {
    return (
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
            <SectionTitle kicker="Rejoindre le mouvement" title="3 portes d’entrée" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {joinCards.map((card) => (
                    <div
                        key={card.title}
                        className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <p className="text-lg font-semibold text-slate-900">{card.title}</p>
                        <p className="mt-2 flex-1 text-sm text-slate-600">{card.desc}</p>
                        <button className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-700">
                            En savoir plus
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800">Pour les producteurs</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Coaching, intrants, équipements partagés, primes qualité et traçabilité.
                    </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800">Pour les partenaires</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Co-création de programmes carbone, reboisement, filières durables et reporting ESG.
                    </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800">Pour les bénévoles / stagiaires</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Support terrain, communication, data, cartographie, animation de formations.
                    </p>
                </div>
            </div>
        </div>
    )
}
