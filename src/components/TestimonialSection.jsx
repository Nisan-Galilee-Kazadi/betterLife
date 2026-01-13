import React, { useState } from "react";
import { FaPlay, FaQuoteLeft, FaStar, FaExpandAlt } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

export function TestimonialSection() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Local assets mapping to translated items
  const testimonialAssets = {
    1: {
      videoPath: "/videos/temoignage-jean-chretien.mp4",
      image: "/images/temoignages/Mr chretien.png",
      rating: 5
    },
    2: {
      videoPath: "/videos/temoignage-gerard.mp4",
      image: "/images/temoignages/Mr Gerard.png",
      rating: 5
    }
  };

  const translatedItems = t("testimonialSection.items") || [];
  const testimonials = translatedItems.map(item => ({
    ...item,
    ...testimonialAssets[item.id]
  }));

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
    <div className="bg-gradient-to-br from-slate-50 to-white py-24 sm:py-32 w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
            {t("testimonialSection.title")}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t("testimonialSection.subtitle")}
          </p>
        </div>

        {/* Testimonials Grid - Using items-start to prevent uniform height stretching */}
        <div className="grid gap-8 md:grid-cols-2 items-start mb-12">
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
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <FaStar key={i} className="text-green-400 text-lg" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative overflow-hidden">
                  <div
                    className={`text-slate-700 text-base sm:text-lg leading-relaxed mb-6 italic transition-all duration-700 ease-in-out ${expandedTestimonials[testimonial.id] ? 'max-h-[1000px] opacity-100' : 'max-h-32 sm:max-h-24 opacity-90'
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
                      {t("testimonialSection.btn_less")}
                    </>
                  ) : (
                    <>
                      <FaExpandAlt />
                      {t("testimonialSection.btn_more")}
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
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-[#63b32e] to-[#0f70b7] flex items-center justify-center text-white font-bold text-xl" style={{ display: 'none' }}>
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
                    <span className="text-sm font-medium">{t("testimonialSection.btn_video")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voir Plus De Temoignages Button */}
        <div className="text-center">
          {!showAll && testimonials.length > 2 && (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-[#63b32e] hover:bg-[#4a8c23] text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FaExpandAlt />
              {t("testimonialSection.btn_more_section")}
            </button>
          )}

          {showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-8 py-3 rounded-full font-semibold transition-all duration-200"
            >
              {t("testimonialSection.btn_less")}
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
                <h3 className="text-xl font-bold">{t("testimonialSection.modal.title")}</h3>
                <button
                  onClick={closeVideoModal}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors font-bold"
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
                <h4 className="font-bold text-slate-900 mb-2">{t("testimonialSection.modal.info_title")}</h4>
                <p className="text-slate-600 text-sm">
                  {t("testimonialSection.modal.info_text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
