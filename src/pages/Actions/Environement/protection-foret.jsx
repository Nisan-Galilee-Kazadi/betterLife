import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_protection_foret.webp";

export default function ProtectionForet() {
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
                        PROTECTION FORESTIÈRE
                    </h1>
                    <h2 className="text-3xl text-gray-700 text-center mt-2">Les Poumons Verts du Congo</h2>
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
                                La Révolution de la Conservation Forestière au Congo
                            </h3>
                            <div className="text-gray-600 text-sm mb-4">
                                Par <span className="font-semibold">Dr. Émilie Mwamba</span> • 
                                Écologie Forestière • 
                                <span className="italic"> 5 min de lecture</span>
                            </div>
                            
                            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                    Le programme de protection forestière de Better Life sauvegarde 
                                    les forêts primaires congolaises tout en créant des opportunités 
                                    économiques durables pour les communautés locales. Nos approches 
                                    innovantes combinent conservation traditionnelle et technologies modernes.
                                </p>
                                
                                <p className="mb-4">
                                    Notre stratégie intégrée implique les populations autochtones 
                                    comme gardiennes de la forêt, développant des alternatives 
                                    économiques à la déforestation tout en préservant la 
                                    biodiversité exceptionnelle de nos écosystèmes forestiers.
                                </p>

                                <div className="my-6">
                                    <img 
                                        src={imgHero} 
                                        alt="Forêt tropicale protégée" 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                                        Notre zone de conservation dans le bassin du Congo
                                    </p>
                                </div>

                                <h4 className="text-2xl font-bold mb-3 text-gray-900">Innovations Durables</h4>
                                <p className="mb-4">
                                    Nous utilisons des technologies de surveillance par satellite, 
                                    des systèmes d'alerte communautaire et des programmes 
                                    de reforestation participative. Ces innovations ont 
                                    réduit de 80% la déforestation illégale dans nos zones d'intervention.
                                </p>

                                <div className="bg-gray-100 p-4 border-l-4 border-black my-6">
                                    <p className="text-lg italic">
                                        "La protection de notre forêt nous a permis de développer 
                                        l'écotourisme et la récolte durable. Nos revenus 
                                        ont triplé tout en préservant l'héritage de nos ancêtres."
                                    </p>
                                    <p className="text-sm mt-2 text-right font-semibold">— Chef Mbuti Jean-Pierre, Communauté partenaire</p>
                                </div>
                            </div>
                        </article>

                        {/* Article Secondaire */}
                        <article className="border-b-2 border-gray-300 pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Impact sur la Biodiversité
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Conservation • <span className="italic"> 3 min de lecture</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <img 
                                    src={imgHero} 
                                    alt="Faune forestière" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <img 
                                    src={imgHero} 
                                    alt="Programme de reforestation" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Le programme a protégé plus de 500,000 hectares de forêt 
                                    primaire et sauvé 120 espèces menacées. Nos corridors 
                                    écologiques permettent la migration des animaux 
                                    et préservent la connectivité des écosystèmes.
                                </p>
                                
                                <p>
                                    La surveillance communautaire et les technologies 
                                    modernes garantissent une protection efficace 
                                    contre l'exploitation illégale et la dégradation forestière.
                                </p>
                            </div>
                        </article>

                        {/* Article Transformation */}
                        <article className="pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Économie Verte et Inclusive
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Développement Durable • <span className="italic"> 4 min de lecture</span>
                            </div>
                            
                            <img 
                                src={imgHero} 
                                alt="Écotourisme forestier" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Notre modèle économique vert crée des emplois dans 
                                    l'écotourisme, la récolte durable et la transformation 
                                    des produits forestiers non ligneux. Ces activités 
                                    génèrent des revenus tout en préservant les ressources naturelles.
                                </p>
                                
                                <p>
                                    Les produits certifiés Better Life sont disponibles 
                                    sur les marchés internationaux, garantissant une 
                                    rémunération équitable pour les communautés forestières.
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
                                    <div className="text-2xl font-bold text-yellow-400">500K</div>
                                    <div className="text-sm">Hectares protégés</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">120</div>
                                    <div className="text-sm">Espèces sauvées</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">80%</div>
                                    <div className="text-sm">Réduction déforestation</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">3x</div>
                                    <div className="text-sm">Augmentation revenus</div>
                                </div>
                            </div>
                        </div>

                        {/* Encadré Caractéristiques */}
                        <div className="bg-green-50 border-2 border-green-200 p-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-900">CARACTÉRISTIQUES</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-700 mt-1">▸</span>
                                    <span className="text-sm">Surveillance satellite</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-700 mt-1">▸</span>
                                    <span className="text-sm">Participation communautaire</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-700 mt-1">▸</span>
                                    <span className="text-sm">Corridors écologiques</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-700 mt-1">▸</span>
                                    <span className="text-sm">Écotourisme durable</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-700 mt-1">▸</span>
                                    <span className="text-sm">Certification internationale</span>
                                </li>
                            </ul>
                        </div>

                        {/* Publicité Style */}
                        <div className="bg-gray-100 p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">PUBLICITÉ</div>
                            <div className="bg-white p-4 border border-gray-300">
                                <h5 className="font-bold mb-2">Soutenez nos forêts</h5>
                                <p className="text-sm text-gray-600 mb-3">
                                    Participez à la protection des poumons verts de la planète
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
                                    <Link to="/Actions/Environement/credit-carbone" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Crédit Carbone : Innovation Écologique</h5>
                                        <p className="text-xs text-gray-600">Il y a 2 jours</p>
                                    </Link>
                                </div>
                                <div className="pb-3 border-b">
                                    <Link to="/Actions/Environement/eco-kelasi" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Éco-Kelasi : Éducation Environnementale</h5>
                                        <p className="text-xs text-gray-600">Il y a 5 jours</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/Actions/elevages/apiculture" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Apiculture : Le Doux Trésor du Congo</h5>
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
