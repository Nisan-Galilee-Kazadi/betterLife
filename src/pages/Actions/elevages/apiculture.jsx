import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_apiculture.webp";

export default function Apiculture() {
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
                        APICULTURE
                    </h1>
                    <h2 className="text-3xl text-gray-700 text-center mt-2">Le Doux Trésor du Congo</h2>
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
                                L'Explosion de l'Apiculture Congolaise
                            </h3>
                            <div className="text-gray-600 text-sm mb-4">
                                Par <span className="font-semibold">Dr. Marie-Louise Ntumba</span> • 
                                Production Apicole • 
                                <span className="italic"> 5 min de lecture</span>
                            </div>
                            
                            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                    Le programme apicole de Better Life révèle le potentiel exceptionnel 
                                    du miel congolais sur les marchés internationaux. Nos ruchers 
                                    modernes produisent des miels monofloraux d'une qualité 
                                    exceptionnelle, reconnus pour leurs vertus thérapeutiques uniques.
                                </p>
                                
                                <p className="mb-4">
                                    Notre approche respectueuse de l'environnement combine techniques 
                                    traditionnelles et innovations modernes pour garantir des 
                                    récoltes abondantes tout en préservant la biodiversité. 
                                    Les apiculteurs bénéficient d'un accompagnement complet 
                                    de la formation à la commercialisation.
                                </p>

                                <div className="my-6">
                                    <img 
                                        src={imgHero} 
                                        alt="Rucher moderne" 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                                        Notre rucher modèle dans la région de l'Équateur
                                    </p>
                                </div>

                                <h4 className="text-2xl font-bold mb-3 text-gray-900">Techniques Durables</h4>
                                <p className="mb-4">
                                    Nous utilisons des ruches Kenya Top Bar adaptées au climat 
                                    tropical, des systèmes de suivi par GPS et des techniques 
                                    de récolte respectueuses des abeilles. Ces innovations 
                                    doublent les rendements tout en garantissant la qualité.
                                </p>

                                <div className="bg-gray-100 p-4 border-l-4 border-black my-6">
                                    <p className="text-lg italic">
                                        "L'apiculture moderne nous a permis de diversifier nos revenus 
                                        et de protéger nos forêts. Le miel bio du Congo est désormais 
                                        exporté vers l'Europe."
                                    </p>
                                    <p className="text-sm mt-2 text-right font-semibold">— François Mwamba, Apiculteur partenaire</p>
                                </div>
                            </div>
                        </article>

                        {/* Article Secondaire */}
                        <article className="border-b-2 border-gray-300 pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Impact Écologique et Économique
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Conservation • <span className="italic"> 3 min de lecture</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <img 
                                    src={imgHero} 
                                    alt="Rucher forestier" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <img 
                                    src={imgHero} 
                                    alt="Récolte du miel" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Le programme a protégé plus de 10,000 hectares de forêts 
                                    grâce à l'apiculture sylvicole. Les revenus des apiculteurs 
                                    ont augmenté de 400%, créant une alternative économique 
                                    à la déforestation.
                                </p>
                                
                                <p>
                                    La pollinisation améliorée a augmenté les rendements 
                                    agricoles de 30% dans les zones d'intervention, 
                                    bénéficiant à toute la communauté.
                                </p>
                            </div>
                        </article>

                        {/* Article Transformation */}
                        <article className="pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                De la Ruche au Pot de Miel
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Artisanat Local • <span className="italic"> 4 min de lecture</span>
                            </div>
                            
                            <img 
                                src={imgHero} 
                                alt="Transformation du miel" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Nos mielleries artisanales assurent une transformation 
                                    de qualité qui préserve toutes les propriétés du miel. 
                                    Le conditionnement sur place garantit la traçabilité 
                                    et la fraîcheur de nos produits exceptionnels.
                                </p>
                                
                                <p>
                                    Les miels Better Life sont disponibles dans les boutiques 
                                    spécialisées de Kinshasa et exportés vers plusieurs pays 
                                    européens sous label bio et équitable.
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
                                    <div className="text-2xl font-bold text-yellow-400">50,000</div>
                                    <div className="text-sm">Litres de miel/an</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">1,200+</div>
                                    <div className="text-sm">Apiculteurs partenaires</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">10K</div>
                                    <div className="text-sm">Hectares protégés</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">4x</div>
                                    <div className="text-sm">Augmentation revenus</div>
                                </div>
                            </div>
                        </div>

                        {/* Encadré Caractéristiques */}
                        <div className="bg-yellow-50 border-2 border-yellow-200 p-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-900">CARACTÉRISTIQUES</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">▸</span>
                                    <span className="text-sm">Miel biologique certifié</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">▸</span>
                                    <span className="text-sm">Miels monofloraux</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">▸</span>
                                    <span className="text-sm">Apiculture sylvicole</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">▸</span>
                                    <span className="text-sm">Commerce équitable</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">▸</span>
                                    <span className="text-sm">Traçabilité complète</span>
                                </li>
                            </ul>
                        </div>

                        {/* Publicité Style */}
                        <div className="bg-gray-100 p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">PUBLICITÉ</div>
                            <div className="bg-white p-4 border border-gray-300">
                                <h5 className="font-bold mb-2">Soutenez nos apiculteurs</h5>
                                <p className="text-sm text-gray-600 mb-3">
                                    Découvrez nos miels artisanaux du Congo
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
                                    <Link to="/Actions/elevages/pisciculture" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Pisciculture : L'Or Bleu du Congo</h5>
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
