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
import heroImage2 from "../images/hero_agriculture.png";
import heroImage3 from "../images/hero_reforestation.png";
import heroImage4 from "../images/images.jfif";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
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
  const { t } = useLanguage();
  const heroImages = [
    { src: heroImage1, alt: "Plantation de cacao durable" },
    { src: heroImage2, alt: "Agriculture durable au Congo" },
    { src: heroImage3, alt: "Reboisement et reforestation" },
    { src: heroImage4, alt: "Reboisement et reforestation" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden">
        {/* Carousel Images */}
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.6] transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all hidden md:block md:opacity-0 md:hover:opacity-100 z-10"
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
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all hidden md:block md:opacity-0 md:hover:opacity-100 z-10"
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
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              aria-label={`${t("common.goToImage")} ${index + 1}`}
            />
          ))}
        </div>

        <div className="mx-auto max-w-5xl px-6 py-32 text-center lg:py-48">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-lg whitespace-pre-line">
            {t("home.hero.title")}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/90 drop-shadow-md">
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <Link
              to="/Actions"
              className="rounded-md bg-[#63b32e] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#529624] hover:brightness-110"
            >
              {t("home.hero.cta1")}
            </Link>
            <Link
              to="/contact"
              className="rounded-md bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {t("home.hero.cta2")} <span aria-hidden="true">→</span>
            </Link>
          </div>
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
                number: "85000",
                label: t("common.beneficiaries"),
                color: "blue",
                suffix: "+",
              },
              {
                icon: FaTree,
                number: "450000",
                label: t("common.trees"),
                color: "green",
                suffix: "",
              },
              {
                icon: FaGlobeAmericas,
                number: "28",
                label: t("common.actions"),
                color: "blue",
                suffix: "",
              },
              {
                icon: FaHandsHelping,
                number: "5",
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
