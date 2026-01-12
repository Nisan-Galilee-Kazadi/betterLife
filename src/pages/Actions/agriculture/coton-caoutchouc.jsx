import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

import imgHero from "./images/hero_coton_hevea.webp";

export default function CottonCaoutchouc() {
    const { t } = useLanguage();

    return (
        <div className="bg-white" style={{ fontFamily: 'Times New Roman, serif' }}>
            {/* Breadcrumb Section */}
            <div className="border-b-4 border-black py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-gray-900 text-center">
                        COTON-CAOUTCHOUC
                    </h1>
                    <h2 className="text-3xl text-gray-700 text-center mt-2">Double Production Durable</h2>
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
                                La Révolution du Coton-Caoutchouc au Congo
                            </h3>
                            <div className="text-gray-600 text-sm mb-4">
                                Par <span className="font-semibold">Dr. Jean-Baptiste Mukendi</span> • 
                                Agriculture Durable • 
                                <span className="italic"> 5 min de lecture</span>
                            </div>
                            
                            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                                <p className="text-lg mb-4 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                                    Notre programme coton-caoutchouc combine deux cultures complémentaires pour maximiser les revenus des agriculteurs tout en préservant l'environnement.
                                </p>
                                
                                <p className="mb-4">
                                    Le programme Coton-Caoutchouc de Better Life représente une avancée majeure dans l'agriculture durable congolaise. 
                                    Nos fermes partenaires produisent désormais du coton et du caoutchouc de qualité supérieure, reconnu sur les marchés internationaux 
                                    pour ses propriétés exceptionnelles et sa durabilité.
                                </p>

                                <div className="my-6">
                                    <img 
                                        src={imgHero} 
                                        alt="Plantation de coton" 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 italic text-center">
                                        Vue de notre plantation de coton-caoutchouc dans la région du Bandundu
                                    </p>
                                </div>

                                <h4 className="text-2xl font-bold mb-3 text-gray-900">Techniques Innovantes</h4>
                                <p className="mb-4">
                                    Nos agriculteurs utilisent des techniques agroforestières avancées qui préservent la biodiversité 
                                    tout en augmentant les rendements. L'association du coton et caoutchouc avec des arbres fruitiers et des essences 
                                    forestières crée un écosystème résilient et productif.
                                </p>

                                <div className="bg-gray-100 p-4 border-l-4 border-black my-6">
                                    <p className="text-lg italic">
                                        "Le passage au coton-caoutchouc a quadruplé nos revenus tout en protégeant nos forêts. 
                                        C'est le futur de l'agriculture congolaise."
                                    </p>
                                    <p className="text-sm mt-2 text-right font-semibold">— Marie Nkulu, Fermière partenaire</p>
                                </div>
                            </div>
                        </article>

                        {/* Article Secondaire */}
                        <article className="border-b-2 border-gray-300 pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Impact Économique et Social
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Économie Rurale • <span className="italic"> 3 min de lecture</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <img 
                                    src={imgHero} 
                                    alt="Ferme cotonnière" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <img 
                                    src={imgHero} 
                                    alt="Récolte du coton" 
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Le programme a déjà transformé la vie de plus de 1,500 familles d'agriculteurs. 
                                    Les revenus moyens ont augmenté de 300%, permettant aux enfants de poursuivre leurs études 
                                    et aux familles d'accéder aux soins de santé.
                                </p>
                                
                                <p>
                                    La formation continue et l'accès aux marchés internationaux garantissent la durabilité 
                                    économique de ce modèle agricole innovant.
                                </p>
                            </div>
                        </article>

                        {/* Article Transformation */}
                        <article className="pb-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                De la Fibre aux Produits Artisanaux
                            </h3>
                            <div className="text-gray-600 text-sm mb-3">
                                Transformation Locale • <span className="italic"> 4 min de lecture</span>
                            </div>
                            
                            <img 
                                src={imgHero} 
                                alt="Transformation du coton" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />

                            <div className="prose text-gray-800 leading-relaxed">
                                <p className="mb-4">
                                    Notre nouvelle unité de transformation permet de maîtriser toute la chaîne de valeur, 
                                    de la fibre aux produits artisanaux. Cette approche garantit une qualité exceptionnelle 
                                    et maximise les bénéfices pour nos agriculteurs.
                                </p>
                                
                                <p>
                                    Les produits Better Life en coton et caoutchouc sont désormais disponibles dans les boutiques spécialisées 
                                    de Kinshasa et exportés vers plusieurs pays européens.
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
                                    <div className="text-2xl font-bold text-yellow-400">1,500+</div>
                                    <div className="text-sm">Familles d'agriculteurs</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">300%</div>
                                    <div className="text-sm">Augmentation des revenus</div>
                                </div>
                                <div className="text-center border-b border-white/30 pb-2">
                                    <div className="text-2xl font-bold text-yellow-400">5,000 ha</div>
                                    <div className="text-sm">Surfaces cultivées</div>
                                </div>
                            </div>
                        </div>

                        {/* Encadré Caractéristiques */}
                        <div className="bg-yellow-50 border-2 border-yellow-200 p-6">
                            <h4 className="text-xl font-bold mb-4 text-gray-900">CARACTÉRISTIQUES</h4>
                            <ul className="space-y-2 text-gray-800">
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">▸</span>
                                    <span className="text-sm">Coton biologique certifié</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">▸</span>
                                    <span className="text-sm">Caoutchouc naturel de qualité</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">▸</span>
                                    <span className="text-sm">Culture associée durable</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">▸</span>
                                    <span className="text-sm">Revenus garantis</span>
                                </li>
                            </ul>
                        </div>

                        {/* Publicité Style */}
                        <div className="bg-gray-100 p-6 text-center">
                            <div className="text-xs text-gray-500 mb-2">PUBLICITÉ</div>
                            <div className="bg-white p-4 border border-gray-300">
                                <h5 className="font-bold mb-2">Soutenez nos agriculteurs</h5>
                                <p className="text-sm text-gray-600 mb-3">
                                    Achetez des produits Better Life et soutenez l'agriculture durable
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
                                    <Link to="/Actions/agriculture/cacao" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Cacao Criollo : L'Or Noir du Congo</h5>
                                        <p className="text-xs text-gray-600">Il y a 2 jours</p>
                                    </Link>
                                </div>
                                <div className="pb-3 border-b">
                                    <Link to="/Actions/agriculture/cafe" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Café Arabica : L'Excellence Congolaise</h5>
                                        <p className="text-xs text-gray-600">Il y a 5 jours</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/Actions/agriculture/plantes-medicinales" className="hover:text-blue-600">
                                        <h5 className="font-semibold text-sm">Plantes Médicinales : Santé Naturelle</h5>
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
