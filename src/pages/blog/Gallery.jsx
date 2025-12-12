import React from 'react'
import { SectionTitle } from '../../components/SectionTitle'
import { FaCamera, FaVideo, FaFolder, FaCalendar, FaTree, FaUsers } from 'react-icons/fa'
import { GiFarmer, GiButterfly, GiBeehive } from 'react-icons/gi'
import { MdSchool, MdWaterDrop, MdGroups } from 'react-icons/md'

export function BlogGallery() {
    const galleries = [
        {
            title: 'Reboisement 2024',
            count: 45,
            icon: FaTree,
            description: 'Photos de nos campagnes de plantation d\'arbres à travers le pays'
        },
        {
            title: 'Formations Agriculteurs',
            count: 32,
            icon: GiFarmer,
            description: 'Moments forts de nos sessions de formation en agriculture durable'
        },
        {
            title: 'Biodiversité',
            count: 28,
            icon: GiButterfly,
            description: 'La faune et la flore protégées par nos programmes de conservation'
        },
        {
            title: 'Communautés',
            count: 56,
            icon: FaUsers,
            description: 'Rencontres avec les communautés bénéficiaires de nos projets'
        },
        {
            title: 'Pépinières',
            count: 38,
            icon: MdSchool,
            description: 'Nos pépinières scolaires et la production de plants'
        },
        {
            title: 'Événements',
            count: 24,
            icon: MdGroups,
            description: 'Cérémonies, inaugurations et célébrations de nos succès'
        }
    ]

    const recentPhotos = [
        { icon: FaTree, title: 'Plantation Kinshasa', date: 'Déc 2024' },
        { icon: GiFarmer, title: 'Formation Kikwit', date: 'Nov 2024' },
        { icon: GiBeehive, title: 'Ruches Modernes', date: 'Nov 2024' },
        { icon: MdWaterDrop, title: 'Puits Village', date: 'Oct 2024' },
        { icon: MdSchool, title: 'Remise Certificats', date: 'Oct 2024' },
        { icon: FaTree, title: 'Récolte Bio', date: 'Sep 2024' },
        { icon: GiButterfly, title: 'Papillons Salonga', date: 'Sep 2024' },
        { icon: MdSchool, title: 'Jardin Scolaire', date: 'Août 2024' },
        { icon: FaUsers, title: 'Partenariat PNUE', date: 'Août 2024' },
        { icon: MdGroups, title: 'Prix Excellence', date: 'Juil 2024' },
        { icon: FaTree, title: 'Pépinière Mbandaka', date: 'Juil 2024' },
        { icon: FaUsers, title: 'Assemblée Communautaire', date: 'Juin 2024' }
    ]

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#63b32e] to-[#0f70b7] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Galerie Photos
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
                            Découvrez en images nos actions sur le terrain et nos réalisations
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Stats */}
                <div className="mb-20 grid gap-6 md:grid-cols-4">
                    {[
                        { number: '2,500+', label: 'Photos', icon: FaCamera },
                        { number: '150+', label: 'Vidéos', icon: FaVideo },
                        { number: '45', label: 'Albums', icon: FaFolder },
                        { number: '5', label: 'Années d\'archives', icon: FaCalendar }
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-xl border-2 border-green-100 bg-green-50 p-6 text-center">
                            <stat.icon className="text-5xl mb-2 text-[#63b32e] mx-auto" />
                            <p className="text-3xl font-bold text-[#63b32e] mb-1">{stat.number}</p>
                            <p className="text-sm text-slate-700">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Gallery Collections */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker="Collections" title="Albums Thématiques" />
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {galleries.map((gallery) => (
                            <div key={gallery.title} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/20 cursor-pointer group">
                                <gallery.icon className="text-8xl mb-6 text-[#63b32e] mx-auto group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {gallery.title}
                                </h3>
                                <p className="text-slate-600 mb-4 text-sm">
                                    {gallery.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-[#63b32e]">
                                        {gallery.count} photos
                                    </span>
                                    <button className="text-[#0f70b7] hover:text-[#0d5a94] font-semibold text-sm">
                                        Voir l'album →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Photos Grid */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker="Récentes" title="Dernières Photos Ajoutées" />
                    </div>
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {recentPhotos.map((photo, index) => (
                            <div key={index} className="rounded-xl bg-gradient-to-br from-green-50 to-blue-50 p-6 text-center cursor-pointer hover:scale-105 transition-transform shadow-md border-2 border-green-200">
                                <photo.icon className="text-7xl mb-3 text-[#63b32e] mx-auto" />
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{photo.title}</h4>
                                <p className="text-xs text-slate-600">{photo.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker="Vidéos" title="Nos Documentaires" />
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            { title: 'Reboisement: Un An de Plantation', duration: '12:45', views: '2.5K' },
                            { title: 'Portrait d\'Agriculteurs Transformés', duration: '8:30', views: '1.8K' },
                            { title: 'La Biodiversité du Bassin du Congo', duration: '15:20', views: '3.2K' }
                        ].map((video) => (
                            <div key={video.title} className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white text-center cursor-pointer hover:scale-105 transition-transform">
                                <FaVideo className="text-7xl mb-4 mx-auto" />
                                <h3 className="font-bold mb-2">{video.title}</h3>
                                <div className="flex items-center justify-center gap-4 text-sm text-white/70">
                                    <span className="flex items-center gap-1">
                                        <FaCalendar />
                                        {video.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaUsers />
                                        {video.views}
                                    </span>
                                </div>
                                <button className="mt-4 px-6 py-2 bg-[#63b32e] rounded-lg font-semibold hover:bg-[#529624] transition">
                                    ▶ Regarder
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
                    <FaCamera className="text-7xl text-white mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Partagez Vos Photos
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Vous avez participé à l'un de nos événements? Partagez vos photos avec nous!
                    </p>
                    <button className="rounded-md bg-white px-8 py-4 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50">
                        Envoyer des Photos
                    </button>
                </div>
            </div>
        </div>
    )
}
