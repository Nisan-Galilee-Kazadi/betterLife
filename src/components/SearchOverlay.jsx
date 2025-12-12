import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'
import { FaSearch, FaTimes } from 'react-icons/fa'

const searchData = [
    { title: 'Mission & Vision', path: '/about/mission', content: 'Protection environnement biodiversité développement durable Congo RDC' },
    { title: 'Notre Équipe', path: '/about/team', content: 'Équipe experts environnement agriculture reboisement' },
    { title: 'Partenaires', path: '/about/partners', content: 'Partenaires ONG gouvernement international' },
    { title: 'Agriculture Durable', path: '/Services/agriculture', content: 'Agriculture climato-intelligente formation agriculteurs pratiques durables' },
    { title: 'Reboisement', path: '/Services/reboisement', content: 'Plantation arbres lutte changement climatique pépinières' },
    { title: 'Biodiversité', path: '/Services/biodiversite', content: 'Protection écosystèmes conservation faune flore' },
    { title: 'Projets Communautaires', path: '/Services/communautaire', content: 'Développement communautaire autonomisation femmes éducation' },
    { title: 'Élevage Responsable', path: '/Services/elevage', content: 'Élevage durable apiculture pisciculture volaille' },
    { title: 'Offres Agriculture', path: '/Offres/agriculture', content: 'Packages formation agriculture bio certification' },
    { title: 'Apiculture', path: '/Offres/apiculture', content: 'Formation apiculture ruches modernes miel production' },
    { title: 'Projets Bancal', path: '/Offres/bancal', content: 'Aménagement terrains agricoles irrigation' },
    { title: 'Changement Climatique', path: '/Offres/Changement', content: 'Adaptation climat résilience communautés' },
    { title: 'Projets en Cours', path: '/projets/en-cours', content: 'Projets actifs reboisement agriculture biodiversité' },
    { title: 'Projets Réalisés', path: '/projets/realises', content: 'Projets complétés succès impact bénéficiaires' },
    { title: 'Actualités', path: '/blog/news', content: 'News événements formations partenariats' },
    { title: 'Galerie', path: '/blog/gallery', content: 'Photos vidéos projets terrain réalisations' },
    { title: 'Contact', path: '/contact', content: 'Contactez-nous Kinshasa Ngaliema adresse email téléphone' },
]

export function SearchOverlay({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState([])
    const inputRef = useRef(null)
    const { t } = useLanguage()

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [onClose])

    useEffect(() => {
        if (searchQuery.trim().length < 2) {
            setResults([])
            return
        }

        const query = searchQuery.toLowerCase()
        const filtered = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        )
        setResults(filtered)
    }, [searchQuery])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
            <div className="min-h-screen px-4 py-8">
                <div className="mx-auto max-w-3xl">
                    {/* Search Box */}
                    <div className="rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <FaSearch className="text-2xl text-[#63b32e]" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('common.searchPlaceholder')}
                                className="flex-1 text-xl outline-none text-slate-900 placeholder:text-slate-400"
                            />
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-slate-100 transition"
                            >
                                <FaTimes className="text-xl text-slate-600" />
                            </button>
                        </div>

                        {/* Results */}
                        {searchQuery.trim().length >= 2 && (
                            <div className="border-t border-slate-200 pt-4">
                                {results.length > 0 ? (
                                    <React.Fragment>
                                        <p className="text-sm text-slate-600 mb-4">
                                            {results.length} {t('common.resultsFound')}
                                        </p>
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            {results.map((result, index) => (
                                                <Link
                                                    key={index}
                                                    to={result.path}
                                                    onClick={onClose}
                                                    className="block p-4 rounded-lg border border-slate-200 hover:border-[#63b32e] hover:bg-green-50 transition"
                                                >
                                                    <h3 className="font-bold text-slate-900 mb-1">{result.title}</h3>
                                                    <p className="text-sm text-slate-600 line-clamp-2">{result.content}</p>
                                                    <p className="text-xs text-[#0f70b7] mt-2">{result.path}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <p className="text-center text-slate-600 py-8">
                                        {t('common.noResults')} "{searchQuery}"
                                    </p>
                                )}
                            </div>
                        )}

                        {searchQuery.trim().length < 2 && (
                            <div className="text-center text-slate-500 py-8">
                                <p>{t('common.typeToSearch')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
