import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { SectionTitle } from '../components/SectionTitle'

export function PlaceholderPage() {
    const location = useLocation()
    const path = location.pathname.split('/').filter(Boolean).pop()
    const title = path ? path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ') : 'Page'

    return (
        <div className="bg-white min-h-[60vh] flex items-center justify-center">
            <div className="mx-auto max-w-4xl px-6 py-20 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#63b32e]">En construction</p>
                <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl capitalize">
                    {title}
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
                    Ici c'est la page <span className="font-semibold text-slate-900">{title}</span>.
                    <br />Contenu en cours d'intégration.
                </p>
            </div>
        </div>
    )
}
