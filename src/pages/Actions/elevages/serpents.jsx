import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_serpents.webp";

export default function Serpents() {
    const { t } = useLanguage();
    const currentDate = new Date().toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    });

    return (
        <div className="bg-white" style={{ fontFamily: 'Times New Roman, serif' }}>
            {/* Breadcrumb Section */}
            <div className="border-b-4 border-black py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 text-center">
                        ÉLEVAGE DE SERPENTS
                    </h1>
                    <h2 className="text-3xl text-gray-700 text-center mt-2">Recherche et Conservation</h2>
                </div>
            </div>

            {/* Main Content - Two Column Journal Layout */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Column - 2/3 width */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Article Principal */}
                        <article className="border-b-4 border-black pb-6">
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">
                                L'Innovation dans l'Élevage de Serpents au Congo
                            </h3>
                            <div className="text-gray-600 text-sm mb-4">
                                Par <span className="font-semibold">Dr. Jean-Pierre Mbelu</span> • 
                                Herpétologie • 
                                <span className="italic"> 5 min de lecture</span>
                            </div>
                            
                            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                    Le programme d'élevage de serpents de Better Life mène des 
                                    recherches pionnières sur les espèces congolaises tout en 
                                    développant des techniques d'élevage durables. Nos installations 
                                    modernes respectent les normes internationales de bien-être animal.
                                </p>
                                
                                <p className="mb-4">
                                    Notre approche scientifique combine conservation des espèces, 
                                    recherche médicale et éducation environnementale. Les éleveurs 
                                    spécialisés bénéficient d'une formation avancée en herpétologie 
                                    et d'un accès aux technologies de pointe.
                                </p>

                                <div className="my-6">
                                    <img 
                                        src={imgHero} 
                                        alt="Centre de recherche herpétologique" 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                                        Notre centre de recherche et conservation dans la région du Bas-Congo
                                    </p>
                                </div>

                                <h4 className="text-2xl font-bold mb-3 text-gray-900">Recherche Scientifique</h4>
                                <p className="mb-4">
                                    Nous menons des études sur les venins pour développer 
                                    des antidotes et des médicaments. Nos collaborations 
                                    avec les instituts de recherche internationaux 
                                    positionnent le Congo comme leader en herpétologie africaine.
                                </p>

                                <div className="bg-gray-100 p-4 border-l-4 border-black my-6">
                                    <p className="text-lg italic">
                                        "L'élevage scientifique de serpents nous permet de 
                                        protéger les espèces menacées tout en développant 
                                        des traitements qui sauvent des vies. C'est l'alliance 
                                        parfaite entre tradition et science."
                                    </p>
                                    <p className="text-sm mt-2 text-right font-semibold">— Dr. Sophie Kalonji, Chercheuse partenaire</p>
                                </div>
                            </div>
                        </article>

                        {/* Article Secondaire */}
                        <article className="border-b-2 border-gray-300 pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Impact sur la Conservation
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Protection de la Nature • <span className="italic"> 3 min de lecture</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <img 
                                    src={imgHero} 
                                    alt="Programme de conservation" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <img 
                                    src={imgHero} 
                                    alt="Recherche sur les venins" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Le programme a permis de sauver 15 espèces menacées 
                                    et de réintroduire plus de 200 serpents dans leur 
                                    habitat naturel. Nos recherches sur les venins 
                                    ont conduit à 3 brevets pharmaceutiques internationaux.
                                </p>
                                
                                <p>
                                    L'éducation environnementale sensibilise plus de 
                                    10,000 personnes par an à l'importance de la 
                                    biodiversité congolaise.
                                </p>
                            </div>
                        </article>

                        {/* Article Transformation */}
                        <article className="pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Applications Médicales
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Innovation Santé • <span className="italic"> 4 min de lecture</span>
                            </div>
                            
                            <img 
                                src={imgHero} 
                                alt="Laboratoire de recherche" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Notre laboratoire moderne extrait et purifie les venins 
                                    pour créer des antidotes et des médicaments innovants. 
                                    Ces traitements sont distribués dans les hôpitaux 
                                    congolais et exportés vers plusieurs pays africains.
                                </p>
                                
                                <p>
                                    Les recherches sur les propriétés thérapeutiques 
                                    des venins ouvrent de nouvelles perspectives pour 
                                    le traitement de maladies cardiovasculaires et neurologiques.
                                </p>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar Column - 1/3 width */}
                    <aside className="space-y-6">
                        
                        {/* Encadré Statistiques */}
                        <div className="bg-black text-white p-6">
                            <h4 className="text-xl font-bold mb-4 text-center">CHIFFRES CLÉS</h4>
                            <div className="space-y-3">
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">50+</div>
                                    <div className="text-sm">Espèces étudiées</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">15</div>
                                    <div className="text-sm">Chercheurs spécialisés</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">3</div>
                                    <div className="text-sm">Brevets pharmaceutiques</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">200+</div>
                                    <div className="text-sm">Serpents réintroduits</div>
                                </div>
                            </div>
                        </div>

                        {/* Encadré Caractéristiques */}
                        <div className="bg-emerald-50 border-2 border-emerald-200 p-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-900">CARACTÉRISTIQUES</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-700 mt-1">▸</span>
                                    <span className="text-sm">Recherche scientifique</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-700 mt-1">▸</span>
                                    <span className="text-sm">Conservation espèces</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-700 mt-1">▸</span>
                                    <span className="text-sm">Applications médicales</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-700 mt-1">▸</span>
                                    <span className="text-sm">Éducation environnementale</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-700 mt-1">▸</span>
                                    <span className="text-sm">Collaborations internationales</span>
                                </li>
                            </ul>
                        </div>

                        {/* Publicité Style */}
                        <div className="bg-gray-100 p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">PUBLICITÉ</div>
                            <div className="bg-white p-4 border border-gray-300">
                                <h5 className="font-bold mb-2">Soutenez nos recherches</h5>
                                <p className="text-sm text-gray-600 mb-3">
                                    Participez à la conservation et à l'innovation médicale
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-block bg-black text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800"
                                >
                                    Soutenir
                                </Link>
                            </div>
                        </div>

                        {/* Articles Connexes */}
                        <div className="border-2 border-black p-6">
                            <h4 className="text-xl font-bold mb-4">ARTICLES CONNEXES</h4>
                            <div className="space-y-3">
                                <div className="pb-3 border-b">
                                    <Link to="/Actions/elevages/gros-betail" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Élevage Bovin : Tradition et Excellence</h5>
                                        <p className="text-xs text-gray-600">Il y a 2 jours</p>
                                    </Link>
                                </div>
                                <div className="pb-3 border-b">
                                    <Link to="/Actions/elevages/apiculture" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Apiculture : Le Doux Trésor du Congo</h5>
                                        <p className="text-xs text-gray-600">Il y a 5 jours</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/Actions/elevages/chiens" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Élevage Canin : Compagnie et Service</h5>
                                        <p className="text-xs text-gray-600">Il y a 1 semaine</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Footer Article */}
                <div className="mt-12 pt-8 border-t-2 border-black">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">
                            Cet article vous a plu ? Partagez-le avec votre réseau
                        </p>
                        <div className="flex justify-center gap-4 mb-6">
                            <button className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700">
                                Partager
                            </button>
                            <Link
                                to="/contact"
                                className="bg-green-600 text-white px-4 py-2 text-sm font-semibold hover:bg-green-700"
                            >
                                S'engager
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
