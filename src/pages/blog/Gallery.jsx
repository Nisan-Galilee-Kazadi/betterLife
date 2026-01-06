import React from 'react'
import { SectionTitle } from '../../components/SectionTitle'
import { FaCamera, FaVideo, FaFolder, FaCalendar, FaUsers } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'
import gallery_hero from '../../images/gallery_hero.png'
import reforestation_img from '../../images/news_reforestation.png'
import training_img from '../../images/news_training.png'
import biodiversity_img from '../../images/view-bamboo-trees-forest.jpg'
import community_img from '../../images/close-up-black-people-with-hands-joined.jpg'
import nursery_img from '../../images/planted-tree-farm.jpg'
import events_img from '../../images/activists-collecting-paper-trash-bag.jpg'
import cocoa_img from '../../images/cocoa-beans-cocoa-pod-wooden-surface.jpg'
import partnership_img from '../../images/news_partnership.png'
import water_img from '../../images/rainsoaked-leaves-held-open-hands.jpg'

export function BlogGallery() {
    const { t } = useLanguage()

    const galleries = [
        {
            title: t('blog.gallery.collections.reforestation.title'),
            count: 45,
            image: reforestation_img,
            description: t('blog.gallery.collections.reforestation.desc')
        },
        {
            title: t('blog.gallery.collections.farmersTraining.title'),
            count: 32,
            image: training_img,
            description: t('blog.gallery.collections.farmersTraining.desc')
        },
        {
            title: t('blog.gallery.collections.biodiversity.title'),
            count: 28,
            image: biodiversity_img,
            description: t('blog.gallery.collections.biodiversity.desc')
        },
        {
            title: t('blog.gallery.collections.communities.title'),
            count: 56,
            image: community_img,
            description: t('blog.gallery.collections.communities.desc')
        },
        {
            title: t('blog.gallery.collections.nurseries.title'),
            count: 38,
            image: nursery_img,
            description: t('blog.gallery.collections.nurseries.desc')
        },
        {
            title: t('blog.gallery.collections.events.title'),
            count: 24,
            image: events_img,
            description: t('blog.gallery.collections.events.desc')
        }
    ]

    const recentPhotos = [
        { image: reforestation_img, title: t('blog.gallery.recent.items.plantationKinshasa'), date: 'Déc 2024' },
        { image: training_img, title: t('blog.gallery.recent.items.trainingKikwit'), date: 'Nov 2024' },
        { image: cocoa_img, title: t('blog.gallery.recent.items.modernHives'), date: 'Nov 2024' },
        { image: water_img, title: t('blog.gallery.recent.items.villageWell'), date: 'Oct 2024' },
        { image: events_img, title: t('blog.gallery.recent.items.certificates'), date: 'Oct 2024' },
        { image: cocoa_img, title: t('blog.gallery.recent.items.bioHarvest'), date: 'Sep 2024' },
        { image: biodiversity_img, title: t('blog.gallery.recent.items.butterfliesSalonga'), date: 'Sep 2024' },
        { image: nursery_img, title: t('blog.gallery.recent.items.schoolGarden'), date: 'Août 2024' },
        { image: partnership_img, title: t('blog.gallery.recent.items.unepPartnership'), date: 'Août 2024' },
        { image: community_img, title: t('blog.gallery.recent.items.excellenceAward'), date: 'Juil 2024' },
        { image: nursery_img, title: t('blog.gallery.recent.items.nurseryMbandaka'), date: 'Juil 2024' },
        { image: community_img, title: t('blog.gallery.recent.items.communityAssembly'), date: 'Juin 2024' }
    ]

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    src={gallery_hero}
                    alt="Better Life Gallery"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-40"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t('blog.gallery.hero.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
                            {t('blog.gallery.hero.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                {/* Stats */}
                <div className="mb-20 grid gap-6 md:grid-cols-4">
                    {[
                        { number: '2,500+', label: t('blog.gallery.stats.photos'), icon: FaCamera },
                        { number: '150+', label: t('blog.gallery.stats.videos'), icon: FaVideo },
                        { number: '45', label: t('blog.gallery.stats.albums'), icon: FaFolder },
                        { number: '5', label: t('blog.gallery.stats.years'), icon: FaCalendar }
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
                        <SectionTitle kicker={t('blog.gallery.collections.kicker')} title={t('blog.gallery.collections.title')} />
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {galleries.map((gallery) => (
                            <div key={gallery.title} className="rounded-2xl bg-white overflow-hidden shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/20 cursor-pointer group">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={gallery.image}
                                        alt={gallery.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {gallery.title}
                                    </h3>
                                    <p className="text-slate-600 mb-4 text-sm">
                                        {gallery.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-[#63b32e]">
                                            {gallery.count} {t('blog.gallery.collections.photos')}
                                        </span>
                                        <button className="text-[#0f70b7] hover:text-[#0d5a94] font-semibold text-sm">
                                            {t('blog.gallery.collections.viewAlbum')} →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Photos Grid */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker={t('blog.gallery.recent.kicker')} title={t('blog.gallery.recent.title')} />
                    </div>
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {recentPhotos.map((photo, index) => (
                            <div key={index} className="rounded-xl bg-white overflow-hidden shadow-md ring-1 ring-slate-900/5 cursor-pointer hover:scale-105 transition-transform">
                                <img
                                    src={photo.image}
                                    alt={photo.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4 text-center">
                                    <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">{photo.title}</h4>
                                    <p className="text-xs text-slate-600">{photo.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <SectionTitle kicker={t('blog.gallery.videos.kicker')} title={t('blog.gallery.videos.title')} />
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            { title: t('blog.gallery.videos.items.reforestationYear'), duration: '12:45', views: '2.5K', image: reforestation_img },
                            { title: t('blog.gallery.videos.items.farmersPortrait'), duration: '8:30', views: '1.8K', image: training_img },
                            { title: t('blog.gallery.videos.items.congoBiodiversity'), duration: '15:20', views: '3.2K', image: biodiversity_img }
                        ].map((video) => (
                            <div key={video.title} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition">
                                <div className="aspect-video w-full relative">
                                    <img
                                        src={video.image}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/50 group-hover:scale-110 transition">
                                            <FaVideo className="text-2xl text-white ml-1" />
                                        </div>
                                    </div>
                                    <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded font-medium">
                                        {video.duration}
                                    </span>
                                </div>
                                <div className="bg-slate-900 p-5 text-white">
                                    <h3 className="font-bold mb-2 line-clamp-1">{video.title}</h3>
                                    <div className="flex items-center justify-between text-sm text-white/70">
                                        <span className="flex items-center gap-1">
                                            <FaUsers />
                                            {video.views}
                                        </span>
                                        <button className="text-[#63b32e] font-semibold text-sm hover:text-white transition">
                                            {t('blog.gallery.videos.watch')} →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center">
                    <FaCamera className="text-7xl text-white mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {t('blog.gallery.cta.title')}
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {t('blog.gallery.cta.text')}
                    </p>
                    <button className="rounded-md bg-white px-8 py-4 text-base font-semibold text-[#63b32e] shadow-lg transition hover:bg-slate-50">
                        {t('blog.gallery.cta.btn')}
                    </button>
                </div>
            </div>
        </div>
    )
}
