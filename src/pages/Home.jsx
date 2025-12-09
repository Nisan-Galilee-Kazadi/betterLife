import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../components/SectionTitle'
import heroImage from '../images/hero_clean.png'

export function Home() {
    return (
        <div className="bg-white">
            {/* Hero Section - Full height or near full height */}
            <div className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden">
                <img
                    src={heroImage}
                    alt="Plantation de cacao durable"
                    className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.6]" // Increased brightness slightly for "cleaner" look, but still dark enough for text
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />

                <div className="mx-auto max-w-5xl px-6 py-32 text-center lg:py-48">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-sm">
                        Choisissez un Environnement Sain,<br />Une Alimentation Saine
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/90 drop-shadow-sm">
                        Notre mission est de protéger l'environnement, la biodiversité, lutter pour la conservation de la nature,
                        le bien-être de la population ainsi que la promotion de la sécurité alimentaire.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/domaines"
                            className="rounded-full bg-[#63b32e] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#529624] hover:scale-105"
                        >
                            Découvrir nos actions
                        </Link>
                        <Link to="/contact" className="rounded-full bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                            Nous contacter <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
                {/* Missions Section */}
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-6">
                        <SectionTitle kicker="Notre Mission" title="Agir pour le Climat et la Biodiversité">
                            Better Life aide à comprendre simplement pourquoi certains comportements humains ont un impact négatif
                            sur la biodiversité et propose des pistes d'action concrètes.
                        </SectionTitle>
                        <p className="text-lg text-slate-600">
                            Nous avons mis en place des pépinières scolaires d’un million cinq cents mille arbres d’essences
                            forestières et fruitières pour lutter contre le réchauffement climatique.
                        </p>
                        <div className="mt-6 flex gap-6">
                            <div className="flex-1 rounded-2xl border border-green-100 bg-green-50 p-5 shadow-sm">
                                <p className="font-bold text-[#63b32e] text-4xl">1.5M</p>
                                <p className="mt-1 text-sm font-medium text-slate-700">Arbres à planter</p>
                            </div>
                            <div className="flex-1 rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
                                <p className="font-bold text-[#0f70b7] text-4xl">26 Nov</p>
                                <p className="mt-1 text-sm font-medium text-slate-700">Création (2021)</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {[
                            { title: 'Biodiversité', desc: 'Protéger les écosystèmes fragiles.' },
                            { title: 'Agriculture', desc: 'Pratiques intelligentes face au climat.' },
                            { title: 'Climat', desc: 'Lutte contre le réchauffement.' },
                            { title: 'Élevage', desc: 'Approvisionnement durable.' },
                        ].map((card) => (
                            <div key={card.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition hover:shadow-md hover:ring-[#63b32e]/20">
                                <div className="h-10 w-10 mb-4 rounded-lg bg-green-100 flex items-center justify-center text-[#63b32e]">
                                    {/* Icon placeholder or use specific icon */}
                                    <div className="h-5 w-5 bg-current rounded-sm opacity-50" />
                                </div>
                                <h3 className="font-semibold text-slate-900">{card.title}</h3>
                                <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
