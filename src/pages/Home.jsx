import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SectionTitle } from "../components/SectionTitle";
import {
  FaUsers,
  FaTree,
  FaGlobeAmericas,
  FaHandsHelping,
  FaSeedling,
  FaHeart,
  FaQuoteLeft,
} from "react-icons/fa";
import { GiForest } from "react-icons/gi";
import { MdAgriculture } from "react-icons/md";
import { useLanguage } from "../contexts/LanguageContext";
import heroImage1 from "../images/hero_clean.png";
import hero_agriculture from "../images/agricultural-advertisement-banner-group-new-modern-generic-tractors-green-meadow-sunny-day-mixed.jpg";
import hero_food_security from "../images/food_security_hero.png";

import heroImage3 from "../images/hero_reforestation.png";
import heroImage4 from "../images/images.jfif";
import heroImage5 from "./Actions/Mecanisation/images/IMG-20251215-WA0000.jpg";
import heroImage6 from "./Actions/Communautaire/images/hero_education.jpg";
import heroImage7 from "../images/wide-angle-portrait-beautiful-healthy-cows-row-eating-hay-cowshed-organic-dairy-farm-copy-space.jpg";
import heroImage8 from "./Actions/agriculture/images/hero_cacao.png";
import heroImage9 from "../images/low-angle-perspective-tree-with-beautiful-canopy.jpg";
import heroImage10 from "../images/le-coucher-du-soleil-derriere-la-silhouette-des-pylones-d-electricite.jpg";
import heroImage11 from "../images/planted-tree-farm.jpg";

// Animated Counter Component
function AnimatedCounter({ end, duration = 5000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const endValue =
      typeof end === "string" ? parseInt(end.replace(/,/g, "")) : end;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <span ref={counterRef}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

// Fade In Animation Component
function FadeIn({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      {children}
    </div>
  );
}

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const { t } = useLanguage();
  const heroSlides = [
    {
      src: heroImage1,
      alt: "Protection de la Biodiversité",
      title: t("home.hero.slides.0.title"),
      description: t("home.hero.slides.0.description")
    },
    {
      src: hero_food_security,
      alt: "Sécurité Alimentaire",
      title: t("home.hero.slides.1.title"),
      description: t("home.hero.slides.1.description")
    },
    {
      src: hero_agriculture,
      alt: "Mécanisation Agricole",
      title: t("home.hero.slides.2.title"),
      description: t("home.hero.slides.2.description")
    },
    {
      src: heroImage6,
      alt: "Projets Communautaires",
      title: t("home.hero.slides.3.title"),
      description: t("home.hero.slides.3.description")
    },
    {
      src: heroImage7,
      alt: "Élevage Moderne",
      title: t("home.hero.slides.4.title"),
      description: t("home.hero.slides.4.description")
    },
    {
      src: heroImage8,
      alt: "Cultures Durables",
      title: t("home.hero.slides.5.title"),
      description: t("home.hero.slides.5.description")
    },
    {
      src: heroImage9,
      alt: "Protection de l'Environnement",
      title: t("Actions.environement.hero.title") || "Environnement",
      description: t("Actions.environement.hero.subtitle") || "Protéger notre nature"
    },
    {
      src: heroImage10,
      alt: "Énergie Communautaire",
      title: t("Actions.communautaire.energie.hero.title") || "Énergie",
      description: t("Actions.communautaire.energie.hero.subtitle") || "Énergie pour tous"
    },
    {
      src: heroImage11,
      alt: "Reforestation",
      title: t("Actions.environement.protection_foret.hero.title") || "Reforestation",
      description: t("Actions.environement.protection_foret.hero.subtitle") || "Planter pour l'avenir"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Augmenté à 5 secondes pour une meilleure lisibilité
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    if (e.target?.closest?.("a,button")) return;

    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (e.target?.closest?.("a,button")) return;

    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX == null || touchEndX == null) return;

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Carousel Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover brightness-[0.5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pb-48 sm:pb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                {slide.description}
              </p>
            </div>
          </div>
        ))}

        {/* Fixed CTA Buttons */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-[90%] sm:max-w-max px-4 sm:px-0">
          <Link
            to="/Actions"
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-5 py-2.5 rounded-md font-semibold transition-all shadow-lg text-center w-full sm:w-auto"
          >
            {t("home.hero.cta1")}
          </Link>
          <Link
            to="/contact"
            className="bg-[#63b32e] hover:bg-[#529624] text-white px-5 py-2.5 rounded-md font-semibold transition-all shadow-lg text-center w-full sm:w-auto"
          >
            {t("home.hero.cta2")} <span aria-hidden="true" className="hidden sm:inline">→</span>
          </Link>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all z-10"
          aria-label={t("common.prevImage")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all z-10"
          aria-label={t("common.nextImage")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              aria-label={`${t("common.goToImage")} ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                {t("home.stats.title")}
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                {t("home.stats.subtitle")}
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FaUsers,
                number: "9587",
                label: t("common.beneficiaries"),
                color: "blue",
                suffix: "",
              },
              {
                icon: FaTree,
                number: "3000000",
                label: t("common.trees"),
                color: "green",
                suffix: "+",
              },
              {
                icon: FaGlobeAmericas,
                number: "186",
                label: t("common.actions"),
                color: "blue",
                suffix: "",
              },
              {
                icon: FaHandsHelping,
                number: "17",
                label: t("common.provinces"),
                color: "green",
                suffix: "",
              },
            ].map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 100}>
                <div
                  className={`rounded-2xl border-2 ${stat.color === "green"
                    ? "border-green-200 bg-white"
                    : "border-blue-200 bg-white"
                    } p-8 text-center shadow-lg transition hover:scale-105 hover:shadow-2xl`}
                >
                  <stat.icon
                    className={`text-6xl mb-4 mx-auto ${stat.color === "green"
                      ? "text-[#63b32e]"
                      : "text-[#0f70b7]"
                      }`}
                  />
                  <p
                    className={`text-4xl font-bold mb-2 ${stat.color === "green"
                      ? "text-[#63b32e]"
                      : "text-[#0f70b7]"
                      }`}
                  >
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </p>
                  <p className="text-slate-700 font-semibold">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Mission Section */}
        <FadeIn>
          <div className="grid gap-12 lg:grid-cols-2 mb-24">
            <div className="space-y-6">
              <SectionTitle
                kicker={t("home.mission.kicker")}
                title={t("home.mission.title")}
              >
                {t("home.mission.desc1")}
              </SectionTitle>
              <p className="text-lg text-slate-600">
                {t("home.mission.desc2")}
              </p>
              <div className="mt-6 flex gap-6">
                <div className="flex-1 rounded-2xl border-2 border-green-200 bg-green-50 p-6 shadow-lg">
                  <p className="font-bold text-[#63b32e] text-4xl">
                    {t("home.mission.stat1_val")}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {t("home.mission.stat1_label")}
                  </p>
                </div>
                <div className="flex-1 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 shadow-lg">
                  <p className="font-bold text-[#0f70b7] text-4xl">
                    {t("home.mission.stat2_val")}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {t("home.mission.stat2_label")}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: t("home.mission.cards.biodiversity.title"),
                  desc: t("home.mission.cards.biodiversity.desc"),
                  icon: GiForest,
                  link: "/Actions/biodiversite",
                },
                {
                  title: t("home.mission.cards.agriculture.title"),
                  desc: t("home.mission.cards.agriculture.desc"),
                  icon: MdAgriculture,
                  link: "/Actions/agriculture",
                },
                {
                  title: t("home.mission.cards.reforestation.title"),
                  desc: t("home.mission.cards.reforestation.desc"),
                  icon: FaSeedling,
                  link: "/Actions/reboisement",
                },
                {
                  title: t("home.mission.cards.community.title"),
                  desc: t("home.mission.cards.community.desc"),
                  icon: FaHandsHelping,
                  link: "/Actions/communautaire",
                },
              ].map((card) => (
                <Link
                  key={card.title}
                  to={card.link}
                  className="group rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 transition hover:shadow-xl hover:ring-[#63b32e]/50"
                >
                  <div className="h-12 w-12 mb-4 rounded-lg bg-green-100 flex items-center justify-center text-[#63b32e] group-hover:bg-[#63b32e] group-hover:text-white transition">
                    <card.icon className="text-2xl" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#63b32e] transition">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Recent Projects Section removed per new nav */}

        {/* Testimonials Section */}
        <FadeIn>
          <div className="mb-24">
            <div className="text-center mb-12">
              <SectionTitle
                kicker={t("home.testimonials.kicker")}
                title={t("home.testimonials.title")}
              />
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  quote: t("home.testimonials.t1.quote"),
                  author: t("home.testimonials.t1.author"),
                  role: t("home.testimonials.t1.role"),
                },
                {
                  quote: t("home.testimonials.t2.quote"),
                  author: t("home.testimonials.t2.author"),
                  role: t("home.testimonials.t2.role"),
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-8 shadow-lg"
                >
                  <FaQuoteLeft className="text-4xl text-[#63b32e] mb-4" />
                  <p className="text-slate-700 italic mb-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#63b32e] to-[#0f70b7] flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-slate-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA Section */}
        <FadeIn>
          <div className="rounded-3xl bg-gradient-to-r from-[#0f70b7] to-[#63b32e] p-12 text-center shadow-2xl">
            <FaHeart className="text-6xl text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("home.cta.title")}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="rounded-md bg-white px-8 py-4 text-base font-semibold text-[#0f70b7] shadow-lg transition hover:bg-slate-50"
              >
                {t("home.cta.btn1")}
              </Link>
              <Link
                to="/rejoindre"
                className="rounded-md bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white transition hover:bg-white/20"
              >
                {t("home.cta.btn2")}
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
