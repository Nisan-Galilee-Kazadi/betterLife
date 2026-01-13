import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle } from '../../components/SectionTitle'
import { useLanguage } from '../../contexts/LanguageContext'
import rhPhoto from "../../images/Rh.jpg";
import gestionProjetPhoto from "../../images/GP.jpg";
import secretariatPhoto from "../../images/sec.jpg";
import dircomPhoto from "../../images/dircom.jpg";
import cordonphoto from "../../images/cordon.jpg";
import financierePhoto from "../../images/finaciere.jpg";

// Composant d'animation de carte cadeau
const GiftCardAnimation = ({ member, index }) => {
    const [revealStep, setRevealStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Animation uniquement au chargement de la page
        const timer = setTimeout(() => {
            setIsAnimating(true);
            // Déplier la carte en 3 étapes avec délai progressif augmenté
            const step1 = setTimeout(() => setRevealStep(1), 1000 + (index * 600));
            const step2 = setTimeout(() => setRevealStep(2), 2000 + (index * 600));
            const step3 = setTimeout(() => setRevealStep(3), 3000 + (index * 600));
            
            return () => {
                clearTimeout(step1);
                clearTimeout(step2);
                clearTimeout(step3);
            };
        }, index * 400); // Délai progressif entre les cartes augmenté

        return () => clearTimeout(timer);
    }, [index]);

    const getPhoto = () => {
        if (member.role.includes('RH') || member.role.includes('Ressources Humaines')) {
            return rhPhoto;
        } else if (member.role.includes('Gestionnaire') || member.role.includes('Gestion')) {
            return gestionProjetPhoto;
        } else if (member.role.includes('Secrétaire') || member.role.includes('Secrétariat')) {
            return secretariatPhoto;
        } else if (member.role.includes('Communication') || member.role.includes('Marketing')) {
            return dircomPhoto;
        } else if (member.role.includes('Finance') || member.role.includes('Financière') || member.role.includes('Comptabilité')) {
            return financierePhoto;
        } else if (member.role.includes('Coordonnateur') || member.role.includes('Coordination')) {
            return cordonphoto;
        }
        return null;
    };

    const photo = getPhoto();

    return (
        <div className="relative group">
            {/* Carte cadeau avec animation */}
            <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-1000 h-[570px] mb-[20px] ${
                isAnimating ? 'scale-105' : 'scale-100'
            }`}>
                {/* Papier cadeau - couvre toute la carte */}
                <div className={`absolute inset-0 z-20 transition-all duration-700 ${
                    revealStep >= 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}>
                    {/* Fond principal du papier cadeau avec charte graphique */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#63b32e] via-[#0f70b7] to-[#63b32e]">
                        {/* Motif élégant du papier cadeau */}
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="giftPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <circle cx="20" cy="20" r="2" fill="white"/>
                                        <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#giftPattern)" />
                            </svg>
                        </div>
                        
                        {/* Ruban central avec charte */}
                        <div className="absolute top-1/2 left-0 right-0 h-6 bg-gradient-to-r from-green-400 via-green-300 to-green-400 transform -translate-y-1/2 shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                        </div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-6 bg-gradient-to-b from-green-400 via-green-300 to-green-400 transform -translate-x-1/2 shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </div>
                        
                        {/* Nœud central */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-300 rounded-full shadow-xl border-2 border-green-400 flex items-center justify-center">
                            <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Contenu de la carte finale - tous les éléments présents */}
                <div className="relative h-full">
                    {/* Photo - toujours présente mais invisible au début */}
                    <div className={`relative h-[260px] md:h-[300px] overflow-hidden transition-all duration-700 ${
                        revealStep >= 3 ? 'opacity-100' : 'opacity-0'
                    }`}>
                        {photo ? (
                            <img
                                src={photo}
                                alt={member.name}
                                className="w-full h-full object-cover object-[center_30%]"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#63b32e] to-[#0f70b7] flex items-center justify-center text-white text-3xl font-bold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        )}
                    </div>

                    {/* Informations - toujours présentes mais apparaissent progressivement */}
                    <div className="p-6">
                        {/* Rôle - apparaît en premier */}
                        <div className={`transition-all duration-700 ${
                            revealStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                            <p className="text-[#63b32e] font-semibold text-center mb-2">
                                {member.role}
                            </p>
                        </div>

                        {/* Nom - apparaît en deuxième */}
                        <div className={`transition-all duration-700 ${
                            revealStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                            <h3 className="text-xl font-bold text-slate-900 text-center mb-4">
                                {member.name}
                            </h3>
                        </div>

                        {/* Bio et autres infos - apparaissent avec la photo */}
                        <div className={`transition-all duration-700 ${
                            revealStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                {member.bio}
                            </p>

                            {/* Expertise Tags */}
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {member.expertise && member.expertise.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-green-50 text-[#63b32e] text-xs font-medium rounded-full border border-green-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-500 font-semibold text-center text-sm">
                                {member.mail}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bouton pour relancer l'animation */}
            {revealStep === 3 && (
                <button
                    onClick={() => {
                        setRevealStep(0);
                        setIsAnimating(false);
                        setTimeout(() => {
                            setIsAnimating(true);
                            const step1 = setTimeout(() => setRevealStep(1), 500);
                            const step2 = setTimeout(() => setRevealStep(2), 1000);
                            const step3 = setTimeout(() => setRevealStep(3), 1500);
                        }, 100);
                    }}
                    className="absolute -top-2 -right-2 bg-[#63b32e] text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:scale-110"
                    title="Revoir l'animation"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export function Team() {
    const { t } = useLanguage()

    const teamMembers = t('about.team.members')
    const advisoryBoard = t('about.team.advisory.members')
    const ctaItems = t('about.team.cta.items')

    // Fonction pour réorganiser l'équipe selon l'ordre souhaité
    const organizeTeamOrder = (members) => {
        if (!Array.isArray(members)) return [];
        
        const order = [
            'Délégué',
            'Coordonnateur',
            'Secrétaire',
            'Communication',
            'RH',
            'Finance',
            'Gestion'
        ];

        return [...members].sort((a, b) => {
            const aIndex = order.findIndex(keyword => 
                a.role.toLowerCase().includes(keyword.toLowerCase())
            );
            const bIndex = order.findIndex(keyword => 
                b.role.toLowerCase().includes(keyword.toLowerCase())
            );
            
            if (aIndex === -1 && bIndex === -1) return 0;
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            
            return aIndex - bIndex;
        });
    };

    const organizedTeam = organizeTeamOrder(teamMembers);

    return (
        <div className="bg-white">

            {/* Main Team */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <SectionTitle
                        kicker={t('about.team.leadership.kicker')}
                        title={t('about.team.leadership.title')}
                    >
                        {t('about.team.leadership.text')}
                    </SectionTitle>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
                    {organizedTeam.map((member, index) => (
                        <GiftCardAnimation 
                            key={member.name} 
                            member={member} 
                            index={index}
                        />
                    ))}
                </div>

                {/* Advisory Board - Temporarily Commented */}
                {/* <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle
                            kicker={t('about.team.advisory.kicker')}
                            title={t('about.team.advisory.title')}
                        >
                            {t('about.team.advisory.text')}
                        </SectionTitle>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {Array.isArray(advisoryBoard) && advisoryBoard.map((advisor) => (
                            <div key={advisor.name} className="rounded-xl border-2 border-blue-100 bg-blue-50 p-6 text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0f70b7] to-[#63b32e] mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                                    {advisor.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">{advisor.name}</h3>
                                <p className="text-sm text-[#0f70b7] font-semibold mb-2">{advisor.role}</p>
                                <p className="text-xs text-slate-600">{advisor.org}</p>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Provincial Delegates Section */}
                <div className="mt-16 pb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Délégués Provinciaux
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Nos délégués représentent Better Life dans les six provinces de la République Démocratique du Congo,
                            assurant la coordination de nos actions sur tout le territoire national.
                        </p>s
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                name: "Justin Ngandu",
                                province: "Grand Katanga",
                                role: "Délégué Provincial",
                                bio: "Supervise les actions de Better Life dans la région du Grand Katanga, avec un focus sur le développement durable et l'agriculture.",
                                expertise: ["Développement", "Coordination", "Agriculture"],
                                mail: "admin-lushi@betterlife-ong.org"
                            },
                            {
                                name: "À préciser",
                                province: "Kongo Central",
                                role: "Délégué Provincial",
                                bio: "Coordination des programmes environnementaux et agricoles dans la province du Kongo Central.",
                                expertise: ["Environnement", "Gestion", "Développement"],
                                mail: "boma@betterlife-ong.org"
                            },
                            {
                                name: "À préciser",
                                province: "Grand Bandundu",
                                role: "Délégué Provincial",
                                bio: "Responsable de la mise en œuvre des initiatives communautaires dans la région du Grand Bandundu.",
                                expertise: ["Communauté", "Agriculture", "Projets"],
                                mail: "grad-bandundu@betterlife-ong.org"
                            },
                            {
                                name: "À préciser",
                                province: "Grand Oriental",
                                role: "Délégué Provincial",
                                bio: "Supervise le développement des programmes de conservation et de sécurité alimentaire dans le Grand Oriental.",
                                expertise: ["Conservation", "Sécurité Alimentaire", "Terrain"],
                                mail: "grand-oriental@betterlife-ong.org"
                            },
                            {
                                name: "À préciser",
                                province: "Grand Kasaï",
                                role: "Délégué Provincial",
                                bio: "Coordination des actions de reboisement et de soutien aux agriculteurs dans la zone du Grand Kasaï.",
                                expertise: ["Reboisement", "Soutien Agricole", "Impact"],
                                mail: "grand-kasai@betterlife-ong.org"
                            }
                        ].map((delegate, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                            >
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#63b32e]/5 to-[#0f70b7]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

                                <div className="relative p-8">
                                    {/* Province Badge */}
                                    <div className="flex justify-center mb-4">
                                        <span className="px-4 py-2 bg-gradient-to-r from-[#0f70b7] to-[#63b32e] text-white text-sm font-semibold rounded-full">
                                            {delegate.province}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-slate-900 text-center mb-2">{delegate.name}</h3>
                                    <p className="text-sm text-[#0f70b7] font-semibold text-center mb-4">{delegate.role}</p>

                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                        {delegate.bio}
                                    </p>

                                    {/* Expertise Tags */}
                                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                                        {delegate.expertise.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="px-3 py-1 bg-green-50 text-[#63b32e] text-xs font-medium rounded-full border border-green-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Contact Info */}
                                    <div className="text-center">
                                        <p className="text-gray-500 font-semibold text-sm">
                                            {delegate.mail}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Join Us Section */}
                <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12">
                    <div className="grid gap-8 lg:grid-cols-2 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                {t('about.team.cta.title')}
                            </h2>
                            <p className="text-lg text-white/90 mb-6">
                                {t('about.team.cta.text')}
                            </p>
                            <div className="space-y-3">
                                {Array.isArray(ctaItems) && ctaItems.map((type) => (
                                    <div key={type} className="flex items-center gap-3 text-white">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center lg:text-right">
                            <Link
                                to="/rejoindre"
                                className="inline-block rounded-md bg-white px-8 py-4 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50"
                            >
                                {t('about.team.cta.btn')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
