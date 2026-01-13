import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_chiens.webp";

export default function Chiens() {
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
                        ÉLEVAGE CANIN
                    </h1>
                    <h2 className="text-3xl text-gray-700 text-center mt-2">Compagnie et Service</h2>
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
                                L'Excellence de l'Élevage Canin au Congo
                            </h3>
                            <div className="text-gray-600 text-sm mb-4">
                                Par <span className="font-semibold">Dr. Sophie Mwamba</span> • 
                                Élevage Spécialisé • 
                                <span className="italic"> 5 min de lecture</span>
                            </div>
                            
                            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                    Le programme d'élevage canin de Better Life développe des lignées 
                                    exceptionnelles adaptées au climat tropical congolais. Nos chiens 
                                    sont reconnus pour leur santé robuste, leur intelligence 
                                    et leur polyvalence dans les rôles de compagnie et de service.
                                </p>
                                
                                <p className="mb-4">
                                    Notre approche professionnelle combine sélection génétique rigoureuse, 
                                    socialisation précoce et formation spécialisée. Les éleveurs 
                                    partenaires bénéficient d'un accompagnement vétérinaire 
                                    complet et d'un accès aux meilleures techniques d'élevage.
                                </p>

                                <div className="my-6">
                                    <img 
                                        src={imgHero} 
                                        alt="Élevage canin moderne" 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                                        Notre centre d'élevage canin dans la région du Haut-Katanga
                                    </p>
                                </div>

                                <h4 className="text-2xl font-bold mb-3 text-gray-900">Programmes Spécialisés</h4>
                                <p className="mb-4">
                                    Nous développons des programmes spécifiques pour chiens 
                                    d'assistance, de garde et de compagnie. Nos méthodes 
                                    respectueuses garantissent des animaux équilibrés 
                                    et parfaitement adaptés à leurs futurs rôles.
                                </p>

                                <div className="bg-gray-100 p-4 border-l-4 border-black my-6">
                                    <p className="text-lg italic">
                                        "L'élevage canin professionnel nous a permis de créer 
                                        une entreprise prospère tout en améliorant la qualité 
                                        de vie de notre communauté. Nos chiens sont reconnus 
                                        dans toute la région."
                                    </p>
                                    <p className="text-sm mt-2 text-right font-semibold">— Marc Kabongo, Éleveur partenaire</p>
                                </div>
                            </div>
                        </article>

                        {/* Article Secondaire */}
                        <article className="border-b-2 border-gray-300 pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Impact Social et Économique
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Développement Local • <span className="italic"> 3 min de lecture</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <img 
                                    src={imgHero} 
                                    alt="Chiens d'assistance" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <img 
                                    src={imgHero} 
                                    alt="Formation canine" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Le programme a créé plus de 100 emplois spécialisés et 
                                    fournit des chiens d'assistance aux personnes handicapées. 
                                    Les revenus des éleveurs ont augmenté de 200%, permettant 
                                    le développement économique de plusieurs villages.
                                </p>
                                
                                <p>
                                    La formation continue et l'accès aux marchés urbains 
                                    garantissent la viabilité de ce modèle d'élevage 
                                    de haute qualité.
                                </p>
                            </div>
                        </article>

                        {/* Article Transformation */}
                        <article className="pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Formation et Services
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Excellence Canine • <span className="italic"> 4 min de lecture</span>
                            </div>
                            
                            <img 
                                src={imgHero} 
                                alt="Centre de formation canine" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Notre centre de formation assure le développement complet 
                                    des chiens selon leurs aptitudes. De l'éducation de base 
                                    aux missions spécialisées, nous garantissons des animaux 
                                    parfaitement préparés à leurs futures fonctions.
                                </p>
                                
                                <p>
                                    Les services Better Life sont disponibles pour les 
                                    particuliers, les entreprises et les institutions 
                                    à travers tout le territoire congolais.
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
                                    <div className="text-2xl font-bold text-yellow-400">500+</div>
                                    <div className="text-sm">Chiens produits/an</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">25+</div>
                                    <div className="text-sm">Éleveurs partenaires</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">8</div>
                                    <div className="text-sm">Races spécialisées</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">2x</div>
                                    <div className="text-sm">Augmentation revenus</div>
                                </div>
                            </div>
                        </div>

                        {/* Encadré Caractéristiques */}
                        <div className="bg-gray-50 border-2 border-gray-200 p-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-900">CARACTÉRISTIQUES</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-600 mt-1">▸</span>
                                    <span className="text-sm">Races adaptées climat</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-600 mt-1">▸</span>
                                    <span className="text-sm">Certification santé</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-600 mt-1">▸</span>
                                    <span className="text-sm">Formation spécialisée</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-600 mt-1">▸</span>
                                    <span className="text-sm">Suivi vétérinaire</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-600 mt-1">▸</span>
                                    <span className="text-sm">Garantie qualité</span>
                                </li>
                            </ul>
                        </div>

                        {/* Publicité Style */}
                        <div className="bg-gray-100 p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">PUBLICITÉ</div>
                            <div className="bg-white p-4 border border-gray-300">
                                <h5 className="font-bold mb-2">Soutenez nos éleveurs</h5>
                                <p className="text-sm text-gray-600 mb-3">
                                    Découvrez nos chiens de qualité exceptionnelle
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
