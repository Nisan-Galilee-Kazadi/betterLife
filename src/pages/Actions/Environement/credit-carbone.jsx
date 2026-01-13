import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_credit_carbone.webp";

export default function CreditCarbone() {
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
                        CRÉDIT CARBONE
                    </h1>
                    <h2 className="text-3xl text-gray-700 text-center mt-2">Innovation Écologique</h2>
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
                                La Révolution du Crédit Carbone au Congo
                            </h3>
                            <div className="text-gray-600 text-sm mb-4">
                                Par <span className="font-semibold">Dr. Marc Kalonji</span> • 
                                Finance Verte • 
                                <span className="italic"> 5 min de lecture</span>
                            </div>
                            
                            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                    Le programme de crédit carbone de Better Life transforme les 
                                    forêts congolaises en actifs financiers durables. Nos projets 
                                    de reforestation et de conservation génèrent des crédits 
                                    carbone certifiés, finançant le développement local tout en luttant contre le changement climatique.
                                </p>
                                
                                <p className="mb-4">
                                    Notre approche innovante combine technologies de monitoring 
                                    précises, participation communautaire et standards 
                                    internationaux rigoureux. Les revenus des crédits 
                                    carbone financent directement les projets de développement 
                                    local et la conservation forestière.
                                </p>

                                <div className="my-6">
                                    <img 
                                        src={imgHero} 
                                        alt="Projet de crédit carbone" 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                                        Notre projet de reforestation certifié dans la région de l'Équateur
                                    </p>
                                </div>

                                <h4 className="text-2xl font-bold mb-3 text-gray-900">Technologies de Pointe</h4>
                                <p className="mb-4">
                                    Nous utilisons des capteurs CO2, des drones de surveillance 
                                    et des systèmes blockchain pour garantir la transparence 
                                    et la traçabilité de chaque crédit carbone. Ces technologies 
                                    assurent une certification internationale de la plus haute qualité.
                                </p>

                                <div className="bg-gray-100 p-4 border-l-4 border-black my-6">
                                    <p className="text-lg italic">
                                        "Le crédit carbone a transformé notre village. 
                                        Nous protégeons nos forêts, créons des emplois 
                                        et finançons l'éducation de nos enfants grâce 
                                        à la finance verte internationale."
                                    </p>
                                    <p className="text-sm mt-2 text-right font-semibold">— Chef Village Émilie, Communauté partenaire</p>
                                </div>
                            </div>
                        </article>

                        {/* Article Secondaire */}
                        <article className="border-b-2 border-gray-300 pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Impact Climatique et Social
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Développement Durable • <span className="italic"> 3 min de lecture</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <img 
                                    src={imgHero} 
                                    alt="Monitoring carbone" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <img 
                                    src={imgHero} 
                                    alt="Projet communautaire" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Nos projets ont capturé 2 millions de tonnes de CO2 
                                    et financé 50 écoles et 20 centres de santé. 
                                    Les revenus des crédits carbone bénéficient directement 
                                    aux communautés locales, créant un cercle vertueux de développement.
                                </p>
                                
                                <p>
                                    La certification VCS et Gold Standard garantit 
                                    la crédibilité internationale de nos projets 
                                    et assure une rémunération équitable pour les communautés forestières.
                                </p>
                            </div>
                        </article>

                        {/* Article Transformation */}
                        <article className="pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Finance Verte et Innovation
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Économie Circulaire • <span className="italic"> 4 min de lecture</span>
                            </div>
                            
                            <img 
                                src={imgHero} 
                                alt="Plateforme de trading carbone" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Notre plateforme de trading carbone connecte directement 
                                    les entreprises internationales avec les projets 
                                    communautaires congolais. Cette approche élimine 
                                    les intermédiaires et maximise les revenus pour les populations locales.
                                </p>
                                
                                <p>
                                    Les investisseurs peuvent suivre en temps réel 
                                    l'impact de leurs contributions, garantissant 
                                    transparence et responsabilité dans chaque transaction.
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
                                    <div className="text-2xl font-bold text-yellow-400">2M</div>
                                    <div className="text-sm">Tonnes CO2 capturées</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">50+</div>
                                    <div className="text-sm">Projets certifiés</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">$15M</div>
                                    <div className="text-sm">Revenus générés</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">4x</div>
                                    <div className="text-sm">Augmentation revenus</div>
                                </div>
                            </div>
                        </div>

                        {/* Encadré Caractéristiques */}
                        <div className="bg-teal-50 border-2 border-teal-200 p-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-900">CARACTÉRISTIQUES</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-600 mt-1">▸</span>
                                    <span className="text-sm">Certification VCS/Gold Standard</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-600 mt-1">▸</span>
                                    <span className="text-sm">Monitoring satellite</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-600 mt-1">▸</span>
                                    <span className="text-sm">Blockchain transparente</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-600 mt-1">▸</span>
                                    <span className="text-sm">Revenus directs communautés</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-teal-600 mt-1">▸</span>
                                    <span className="text-sm">Trading international</span>
                                </li>
                            </ul>
                        </div>

                        {/* Publicité Style */}
                        <div className="bg-gray-100 p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">PUBLICITÉ</div>
                            <div className="bg-white p-4 border border-gray-300">
                                <h5 className="font-bold mb-2">Soutenez nos projets</h5>
                                <p className="text-sm text-gray-600 mb-3">
                                    Investissez dans le crédit carbone congolais
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-block bg-black text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800"
                                >
                                    Investir
                                </Link>
                            </div>
                        </div>

                        {/* Articles Connexes */}
                        <div className="border-2 border-black p-6">
                            <h4 className="text-xl font-bold mb-4">ARTICLES CONNEXES</h4>
                            <div className="space-y-3">
                                <div className="pb-3 border-b">
                                    <Link to="/Actions/Environement/protection-foret" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Protection Forestière : Les Poumons Verts du Congo</h5>
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
                                    <Link to="/Actions/elevages/pisciculture" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Pisciculture : L'Or Bleu du Congo</h5>
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
