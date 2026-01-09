import React, { useState } from "react";
import { FaPlay, FaQuoteLeft, FaStar, FaExpandAlt } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

export function TestimonialSection() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "Jean Chrétien",
      shortQuote: "Grâce à Better Life, nous soutenons l'agriculture pérenne, le reboisement et le développement social dans plusieurs régions du Congo. Nos projets visent à améliorer les conditions de vie des communautés, en particulier l'accès à l'éducation et aux soins de santé.",
      fullQuote: "Nous avons constaté les conditions de vie difficiles dans de nombreuses régions du Congo : manque d'eau potable, écoles inadéquates, accès limité aux soins de santé. Face à ces défis, nous menons un plaidoyer pour que les bailleurs de fonds, nationaux et internationaux, soutiennent nos projets visant à améliorer le développement social et économique des communautés, rurales et urbaines.\n\nAvec Better Life, nous intervenons dans plusieurs domaines : agriculture pérenne (cultures de cacahuètes), reboisement, protection des tourbières et mobilisation de fonds. Cette approche polyvalente nous permet de répondre de manière concrète aux besoins de la population et de soutenir des initiatives durables.",
      videoPath: "/videos/temoignage-jean-chretien.mp4",
      rating: 5,
      location: "Kinshasa",
      image: "/images/temoignages/Mr chretien.png"
    },
    {
      id: 2,
      name: "Gérard",
      shortQuote: "À Moubambé, nous avons lancé le projet \"Zéro enfant dans les mines\", combinant agriculture pérenne et accès à l'éducation. Grâce à Better Life, les enfants quittent les mines pour étudier et la communauté adopte des pratiques durables.",
      fullQuote: "À Moubambé, une région reculée du Haut-Katanga, nous avons initié un projet agricole pérenne en collaboration avec Better Life. La population, auparavant dépendante de l'exploitation minière artisanale, a été sensibilisée à l'agriculture durable. Nous avons mis en place des pépinières et mobilisé la communauté locale pour que les enfants puissent quitter les mines et accéder à l'éducation.\n\nLe projet \"Zéro enfant dans les mines\" prévoit également la construction d'écoles et de centres de formation professionnelle pour les jeunes adultes. Ce témoignage illustre comment l'engagement collectif et l'accompagnement technique peuvent transformer durablement la vie des communautés rurales.",
      videoPath: "/videos/temoignage-gerard.mp4",
      rating: 5,
      location: "Haut-Katanga",
      image: "/images/temoignages/Mr Gerard.png"
    }
  ];

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 2);

  const [expandedTestimonials, setExpandedTestimonials] = useState({});

  const toggleExpanded = (id) => {
    setExpandedTestimonials(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openVideoModal = (videoPath) => {
    setSelectedVideo(videoPath);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
            Témoignages
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Découvrez les histoires de transformation et d'impact de nos partenaires et bénéficiaires
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12">
          {displayedTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-2xl hover:border-[#63b32e] transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-[#63b32e]/10 group-hover:text-[#63b32e]/20 transition-colors">
                <FaQuoteLeft className="text-4xl" />
              </div>

              {/* Content */}
              <div className="relative">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative overflow-hidden">
                  <div 
                    className={`text-slate-700 text-base sm:text-lg leading-relaxed mb-6 italic transition-all duration-700 ease-in-out ${
                      expandedTestimonials[testimonial.id] ? 'max-h-96 opacity-100' : 'max-h-32 sm:max-h-24 opacity-90'
                    }`}
                    style={{
                      transitionProperty: 'max-height, opacity',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      transitionDuration: expandedTestimonials[testimonial.id] ? '700ms' : '500ms'
                    }}
                  >
                    <blockquote>
                      {expandedTestimonials[testimonial.id] ? testimonial.fullQuote : testimonial.shortQuote}
                    </blockquote>
                  </div>
                  
                  {/* Gradient fade effect for collapsed text */}
                  {!expandedTestimonials[testimonial.id] && (
                    <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300" />
                  )}
                </div>

                {/* Voir Plus Button */}
                <button
                  onClick={() => toggleExpanded(testimonial.id)}
                  className="text-[#63b32e] hover:text-[#4a8c23] text-sm font-medium mb-4 transition-all duration-200 transform hover:scale-105 flex items-center gap-1"
                >
                  {expandedTestimonials[testimonial.id] ? (
                    <>
                      <FaExpandAlt className="rotate-180" />
                      Voir moins
                    </>
                  ) : (
                    <>
                      <FaExpandAlt />
                      Voir plus
                    </>
                  )}
                </button>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg ring-2 ring-[#63b32e]/20">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-[#63b32e] to-[#0f70b7] flex items-center justify-center text-white font-bold text-xl" style={{display: 'none'}}>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg">{testimonial.name}</div>
                      <div className="text-slate-600 text-sm">{testimonial.location}</div>
                    </div>
                  </div>

                  {/* Video Button */}
                  <button
                    onClick={() => openVideoModal(testimonial.videoPath)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0f70b7] hover:bg-[#0d5a94] text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <FaPlay className="text-sm" />
                    <span className="text-sm font-medium">Voir vidéo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voir Plus Button */}
        <div className="text-center">
          {!showAll && testimonials.length > 2 && (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-[#63b32e] hover:bg-[#4a8c23] text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FaExpandAlt />
              Voir plus de témoignages
            </button>
          )}
          
          {showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-8 py-3 rounded-full font-semibold transition-all duration-200"
            >
              Voir moins
            </button>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#63b32e] to-[#0f70b7] p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Témoignage vidéo</h3>
                <button
                  onClick={closeVideoModal}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Video Content */}
            <div className="p-6">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {selectedVideo.includes('youtube') ? (
                  <iframe
                    src={selectedVideo.replace('watch?v=', 'embed/')}
                    title="Témoignage vidéo"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={selectedVideo}
                    controls
                    className="w-full h-full"
                    title="Témoignage vidéo"
                  >
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                )}
              </div>
              
              {/* Video Info */}
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Témoignage de Better Life</h4>
                <p className="text-slate-600 text-sm">
                  Découvrez l'impact réel de nos projets à travers les témoignages de nos partenaires et bénéficiaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
