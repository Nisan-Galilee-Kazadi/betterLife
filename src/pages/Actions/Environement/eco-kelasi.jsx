import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_eco_kelasi.webp";

export default function EcoKelasi() {
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
                        ÉCO-KELASI
                    </h1>
                    <h2 className="text-3xl text-gray-700 text-center mt-2">Éducation Environnementale</h2>
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
                                La Révolution de l'Éducation Environnementale au Congo
                            </h3>
                            <div className="text-gray-600 text-sm mb-4">
                                Par <span className="font-semibold">Dr. Sophie Mwamba</span> • 
                                Pédagogie Verte • 
                                <span className="italic"> 5 min de lecture</span>
                            </div>
                            
                            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                    Le programme Éco-Kelasi de Better Life transforme l'éducation 
                                    environnementale en intégrant l'écologie dans tous les aspects 
                                    de la vie scolaire. Nos approches pédagogiques innovantes 
                                    forment la prochaine génération de leaders environnementaux congolais.
                                </p>
                                
                                <p className="mb-4">
                                    Notre méthodologie unique combine apprentissage expérientiel, 
                                    projets communautaires et technologies éducatives avancées. 
                                    Les élèves deviennent des agents de changement dans leurs 
                                    communautés, appliquant directement leurs connaissances environnementales.
                                </p>

                                <div className="my-6">
                                    <img 
                                        src={imgHero} 
                                        alt="Classe Éco-Kelasi" 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                                        Notre école modèle Éco-Kelasi dans la province du Kongo Central
                                    </p>
                                </div>

                                <h4 className="text-2xl font-bold mb-3 text-gray-900">Pédagogie Innovante</h4>
                                <p className="mb-4">
                                    Nous utilisons des laboratoires en plein air, des jardins 
                                    scolaires, des programmes de recyclage et des projets 
                                    d'énergie renouvelable. Ces installations pratiques 
                                    transforment chaque école en un écosystème d'apprentissage durable.
                                </p>

                                <div className="bg-gray-100 p-4 border-l-4 border-black my-6">
                                    <p className="text-lg italic">
                                        "Éco-Kelasi a transformé notre école. Nos élèves 
                                        sont devenus des leaders environnementaux qui 
                                        inspirent toute la communauté. Le changement 
                                        commence par l'éducation."
                                    </p>
                                    <p className="text-sm mt-2 text-right font-semibold">— Directeur Jean-Pierre, École partenaire</p>
                                </div>
                            </div>
                        </article>

                        {/* Article Secondaire */}
                        <article className="border-b-2 border-gray-300 pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Impact sur les Communautés
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Développement Local • <span className="italic"> 3 min de lecture</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <img 
                                    src={imgHero} 
                                    alt="Jardin scolaire" 
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
                                    Le programme a formé plus de 50,000 élèves et impacté 
                                    200 communautés. Les projets menés par les étudiants 
                                    ont planté 100,000 arbres et installé 50 systèmes 
                                    d'énergie solaire dans les villages.
                                </p>
                                
                                <p>
                                    Les parents et les communautés locales s'impliquent 
                                    activement, créant un mouvement environnemental 
                                    qui s'étend bien au-delà des salles de classe.
                                </p>
                            </div>
                        </article>

                        {/* Article Transformation */}
                        <article className="pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Technologies Éducatives Vertes
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Innovation Pédagogique • <span className="italic"> 4 min de lecture</span>
                            </div>
                            
                            <img 
                                src={imgHero} 
                                alt="Laboratoire environnemental" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4">
                                    Nos plateformes d'apprentissage numérique proposent 
                                    des cours interactifs sur la biodiversité, le changement 
                                    climatique et les solutions durables. Les applications 
                                    mobiles permettent aux élèves de suivre leur impact 
                                    environnemental en temps réel.
                                </p>
                                
                                <p>
                                    Les laboratoires mobiles et les kits d'expériences 
                                    scientifiques rendent l'éducation environnementale 
                                    accessible même dans les zones les plus reculées du Congo.
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
                                    <div className="text-2xl font-bold text-yellow-400">50K+</div>
                                    <div className="text-sm">Élèves formés</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">200</div>
                                    <div className="text-sm">Écoles partenaires</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">100K</div>
                                    <div className="text-sm">Arbres plantés</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">5x</div>
                                    <div className="text-sm">Augmentation conscience écologique</div>
                                </div>
                            </div>
                        </div>

                        {/* Encadré Caractéristiques */}
                        <div className="bg-lime-50 border-2 border-lime-200 p-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-900">CARACTÉRISTIQUES</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-lime-600 mt-1">▸</span>
                                    <span className="text-sm">Apprentissage expérientiel</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-lime-600 mt-1">▸</span>
                                    <span className="text-sm">Projets communautaires</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-lime-600 mt-1">▸</span>
                                    <span className="text-sm">Technologies éducatives</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-lime-600 mt-1">▸</span>
                                    <span className="text-sm">Jardins scolaires</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-lime-600 mt-1">▸</span>
                                    <span className="text-sm">Certification environnementale</span>
                                </li>
                            </ul>
                        </div>

                        {/* Publicité Style */}
                        <div className="bg-gray-100 p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">PUBLICITÉ</div>
                            <div className="bg-white p-4 border border-gray-300">
                                <h5 className="font-bold mb-2">Soutenez nos écoles</h5>
                                <p className="text-sm text-gray-600 mb-3">
                                    Participez à l'éducation environnementale au Congo
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
                                    <Link to="/Actions/Environement/protection-foret" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Protection Forestière : Les Poumons Verts du Congo</h5>
                                        <p className="text-xs text-gray-600">Il y a 2 jours</p>
                                    </Link>
                                </div>
                                <div className="pb-3 border-b">
                                    <Link to="/Actions/Environement/credit-carbone" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Crédit Carbone : Innovation Écologique</h5>
                                        <p className="text-xs text-gray-600">Il y a 5 jours</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/Actions/elevages/gros-betail" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Élevage Bovin : Tradition et Excellence</h5>
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
