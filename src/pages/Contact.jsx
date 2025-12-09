import React from 'react'
import { SectionTitle } from '../components/SectionTitle'

export function Contact() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-slate-50">
            <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
                <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
                    <div className="space-y-6">
                        <SectionTitle kicker="Contact & suivi" title="Restons en lien">
                            N'hésitez pas à nous contacter pour toute question ou partenariat.
                        </SectionTitle>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-sm font-semibold text-slate-800">Adresse</p>
                                <p className="mt-2 text-sm text-slate-600">
                                    1022, ByPass, C/ Mon-Ngafula<br />
                                    (En diagonale du centre Mayalos)<br />
                                    Kinshasa, RDC
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-sm font-semibold text-slate-800">Contact</p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Email: info@betterlife-ong.org<br />
                                    Tél: +243 00 000 0000 (À vérifier)
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-semibold text-slate-800">Heures d'ouverture</p>
                            <p className="mt-2 text-sm text-slate-600">
                                Lundi - Vendredi : 8h00 - 17h00
                            </p>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold text-slate-800">Formulaire de contact</p>
                        <form className="mt-4 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-xs font-semibold uppercase text-slate-600">Nom</label>
                                    <input
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-green-100 focus:border-green-300 focus:ring-2"
                                        type="text"
                                        placeholder="Nom complet"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase text-slate-600">Email</label>
                                    <input
                                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-green-100 focus:border-green-300 focus:ring-2"
                                        type="email"
                                        placeholder="email@exemple.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase text-slate-600">Message</label>
                                <textarea
                                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-green-100 focus:border-green-300 focus:ring-2"
                                    rows="4"
                                    placeholder="Votre message..."
                                />
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                                style={{ backgroundColor: '#63b32e' }}
                            >
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
