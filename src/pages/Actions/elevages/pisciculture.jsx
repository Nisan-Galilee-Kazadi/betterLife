import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_pisciculture.webp";

export default function Pisciculture() {
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
                        PISCICULTURE
                    </h1>
                    <h2 className="text-3xl text-gray-700 text-center mt-2">L'Or Bleu du Congo</h2>
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
                                La Révolution de la Pisciculture Congolaise
                            </h3>
                            <div className="text-gray-600 text-sm mb-4">
                                Par <span className="font-semibold">Dr. Claude Mbemba</span> • 
                                Aquaculture Durable • 
                                <span className="italic"> 5 min de lecture</span>
                            </div>
                            
                            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                    Le programme piscicole de Better Life transforme les plans d'eau 
                                    congolais en véritables fermes aquatiques productives. 
                                    Nos techniques innovantes permettent d'élever des poissons 
                                    de qualité supérieure tout en préservant les écosystèmes aquatiques.
                                </p>
                                
                                <p className="mb-4">
                                    Notre approche intégrée combine sélection génétique, alimentation 
                                    locale et gestion écologique des étangs. Les pisciculteurs 
                                    partenaires bénéficient d'un accompagnement technique complet 
                                    et d'un accès garanti aux marchés urbains et régionaux.
                                </p>

                                <div className="my-6">
                                    <img 
                                        src={imgHero} 
                                        alt="Étang piscicole moderne" 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                                        Notre ferme piscicole modèle dans la région du Bandundu
                                    </p>
                                </div>

                                <h4 className="text-2xl font-bold mb-3 text-gray-900">Techniques Innovantes</h4>
                                <p className="mb-4">
                                    Nous utilisons des systèmes de polyculture, d'alimentation 
                                    automatisée et de monitoring de la qualité de l'eau. 
                                    Ces technologies doublent les rendements tout en réduisant 
                                    l'impact environnemental de 60%.
                                </p>

                                <div className="bg-gray-100 p-4 border-l-4 border-black my-6">
                                    <p className="text-lg italic">
                                        "La pisciculture moderne a transformé nos étangs familiaux 
                                        en entreprises prospères. Nous produisons désormais 
                                        20 tonnes de poissons par an et employons 15 personnes."
                                    </p>
                                    <p className="text-sm mt-2 text-right font-semibold">— Victor Nkunku, Pisciculteur partenaire</p>
                                </div>
                            </div>
                        </article>

                        {/* Article Secondaire */}
                        <article className="border-b-2 border-gray-300 pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Impact sur la Sécurité Alimentaire
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Protéines Durables • <span className="italic"> 3 min de lecture</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <img 
                                    src={imgHero} 
                                    alt="Étangs piscicoles" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <img 
                                    src={imgHero} 
                                    alt="Récolte de poissons" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Le programme fournit des protéines de qualité à plus de 
                                    100,000 personnes dans nos zones d'intervention. 
                                    La production locale a réduit de 70% les importations 
                                    de poisson dans certaines provinces.
                                </p>
                                
                                <p>
                                    La formation continue et l'accès aux alevins de qualité 
                                    garantissent la durabilité de ce modèle de production 
                                    aquatique innovant.
                                </p>
                            </div>
                        </article>

                        {/* Article Transformation */}
                        <article className="pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                De l'Étang au Marché
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Transformation Locale • <span className="italic"> 4 min de lecture</span>
                            </div>
                            
                            <img 
                                src={imgHero} 
                                alt="Transformation du poisson" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Nos unités de transformation locales assurent le fumage, 
                                    le séchage et la congélation des poissons pour garantir 
                                    la conservation et la qualité. Le circuit court 
                                    assure la fraîcheur et la traçabilité des produits.
                                </p>
                                
                                <p>
                                    Les produits piscicoles Better Life sont disponibles 
                                    dans les marchés de Kinshasa et approvisionnent 
                                    les écoles et hôpitaux de plusieurs provinces.
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
                                    <div className="text-2xl font-bold text-yellow-400">500,000</div>
                                    <div className="text-sm">Tonnes de poissons/an</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">800+</div>
                                    <div className="text-sm">Pisciculteurs partenaires</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">2,000</div>
                                    <div className="text-sm">Hectares d'étangs</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">3.5x</div>
                                    <div className="text-sm">Augmentation revenus</div>
                                </div>
                            </div>
                        </div>

                        {/* Encadré Caractéristiques */}
                        <div className="bg-cyan-50 border-2 border-cyan-200 p-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-900">CARACTÉRISTIQUES</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-600 mt-1">▸</span>
                                    <span className="text-sm">Espèces locales améliorées</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-600 mt-1">▸</span>
                                    <span className="text-sm">Alimentation 100% locale</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-600 mt-1">▸</span>
                                    <span className="text-sm">Polyculture durable</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-600 mt-1">▸</span>
                                    <span className="text-sm">Certification Bio</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-600 mt-1">▸</span>
                                    <span className="text-sm">Traçabilité complète</span>
                                </li>
                            </ul>
                        </div>

                        {/* Publicité Style */}
                        <div className="bg-gray-100 p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">PUBLICITÉ</div>
                            <div className="bg-white p-4 border border-gray-300">
                                <h5 className="font-bold mb-2">Soutenez nos pisciculteurs</h5>
                                <p className="text-sm text-gray-600 mb-3">
                                    Découvrez nos poissons d'élevage de qualité supérieure
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-block bg-black text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800"
                                >
                                    Commander
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
