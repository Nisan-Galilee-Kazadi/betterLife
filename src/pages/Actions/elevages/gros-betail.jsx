import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_gros_betail.webp";

export default function GrosBetail() {
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
                        ÉLEVAGE BOVIN
                    </h1>
                    <h2 className="text-3xl text-gray-700 text-center mt-2">Tradition et Excellence</h2>
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
                                La Renaissance de l'Élevage Bovin au Congo
                            </h3>
                            <div className="text-gray-600 text-sm mb-4">
                                Par <span className="font-semibold">Dr. Joseph Kalonji</span> • 
                                Élevage Extensif • 
                                <span className="italic"> 5 min de lecture</span>
                            </div>
                             
                            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                    Le programme d'élevage bovin de Better Life revitalise un secteur 
                                    stratégique pour l'économie congolaise. Nos races locales améliorées 
                                    s'adaptent parfaitement au climat tropical tout en offrant 
                                    des performances exceptionnelles en production laitière et carnée.
                                </p>
                                 
                                <p className="mb-4">
                                    Notre approche respectueuse de l'environnement combine pâturage 
                                    rotationnel, complémentation nutritionnelle et suivi vétérinaire 
                                    préventif. Les éleveurs traditionnels bénéficient de formations 
                                    modernes tout en préservant leur savoir-faire ancestral.
                                </p>

                                <div className="my-6">
                                    <img 
                                        src={imgHero} 
                                        alt="Élevage bovin extensif" 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                                        Nos troupeaux en pâturage dans les plaines du Kasaï
                                    </p>
                                </div>

                                <h4 className="text-2xl font-bold mb-3 text-gray-900">Innovations Durables</h4>
                                <p className="mb-4">
                                    Nous développons des systèmes agro-pastoraux qui intègrent 
                                    cultures et élevage pour optimiser l'utilisation des terres. 
                                    Les technologies de traçabilité GPS et de monitoring sanitaire 
                                    garantissent la qualité et la sécurité de nos produits.
                                </p>

                                <div className="bg-gray-100 p-4 border-l-4 border-black my-6">
                                    <p className="text-lg italic">
                                        "L'amélioration génétique de notre troupeau a doublé 
                                        notre production laitière. Nous pouvons maintenant 
                                        scolariser tous nos enfants et investir dans notre communauté."
                                    </p>
                                    <p className="text-sm mt-2 text-right font-semibold">— Antoine Mbuyu, Éleveur partenaire</p>
                                </div>
                            </div>
                        </article>

                        {/* Article Secondaire */}
                        <article className="border-b-2 border-gray-300 pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Impact sur la Sécurité Alimentaire
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Nutrition Locale • <span className="italic"> 3 min de lecture</span>
                            </div>
                             
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <img 
                                    src={imgHero} 
                                    alt="Troupeau bovin" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <img 
                                    src={imgHero} 
                                    alt="Production laitière" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Le programme assure l'approvisionnement régulier en lait 
                                    et viande pour plus de 50,000 personnes dans nos zones 
                                    d'intervention. La production laitière locale a réduit 
                                    de 60% les importations dans certaines provinces.
                                </p>
                                 
                                <p>
                                    Les unités de transformation locales garantissent 
                                    la disponibilité de produits de qualité tout au long 
                                    de l'année, même en saison sèche.
                                </p>
                            </div>
                        </article>

                        {/* Article Transformation */}
                        <article className="pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Du Pâturage à l'Assiette
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Circuit Court • <span className="italic"> 4 min de lecture</span>
                            </div>
                             
                            <img 
                                src={imgHero} 
                                alt="Transformation bovine" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Nos abattoirs modernes et nos laiteries artisanales 
                                    assurent une transformation de qualité qui préserve 
                                    les caractéristiques exceptionnelles de nos produits. 
                                    Le circuit court garantit la fraîcheur et la traçabilité.
                                </p>
                                 
                                <p>
                                    Les viandes et produits laitiers Better Life sont 
                                    disponibles dans les marchés locaux et exportés 
                                    vers les pays voisins sous label qualité.
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
                                    <div className="text-2xl font-bold text-yellow-400">8,000</div>
                                    <div className="text-sm">Têtes de bétail</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">220+</div>
                                    <div className="text-sm">Éleveurs partenaires</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">2.5M</div>
                                    <div className="text-sm">Litres de lait/an</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">2.5x</div>
                                    <div className="text-sm">Augmentation revenus</div>
                                </div>
                            </div>
                        </div>

                        {/* Encadré Caractéristiques */}
                        <div className="bg-green-50 border-2 border-green-200 p-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-900">CARACTÉRISTIQUES</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">▸</span>
                                    <span className="text-sm">Races locales améliorées</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">▸</span>
                                    <span className="text-sm">Pâturage rotationnel</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">▸</span>
                                    <span className="text-sm">Production biologique</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">▸</span>
                                    <span className="text-sm">Traçabilité GPS</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">▸</span>
                                    <span className="text-sm">Certification Bio</span>
                                </li>
                            </ul>
                        </div>

                        {/* Publicité Style */}
                        <div className="bg-gray-100 p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">PUBLICITÉ</div>
                            <div className="bg-white p-4 border border-gray-300">
                                <h5 className="font-bold mb-2">Soutenez nos éleveurs</h5>
                                <p className="text-sm text-gray-600 mb-3">
                                    Découvrez nos viandes et produits laitiers d'exception
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
                                    <Link to="/Actions/elevages/apiculture" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Apiculture : Le Doux Trésor du Congo</h5>
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
