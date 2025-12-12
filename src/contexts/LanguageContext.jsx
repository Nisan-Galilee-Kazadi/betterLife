import React, { createContext, useState, useContext, useEffect } from 'react'
import { fr } from '../translations/fr'
import { en } from '../translations/en'
import { es } from '../translations/es'

const LanguageContext = createContext()

const translations = {
    fr,
    en,
    es
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'fr'
    })

    useEffect(() => {
        localStorage.setItem('language', language)
    }, [language])

    const t = (path) => {
        const keys = path.split('.')
        let current = translations[language]

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation missing for key: ${path} in language: ${language}`)
                return path // Return key if translation obscure
            }
            current = current[key]
        }

        return current
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider')
    }
    return context
}
