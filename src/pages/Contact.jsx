import React from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { FaLocationDot, FaEnvelope, FaPhone, FaClock, FaPaperPlane } from 'react-icons/fa6'
import { useLanguage } from '../contexts/LanguageContext'

export function Contact() {
    const { t } = useLanguage()

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#63b32e] to-[#0f70b7] py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            {t('contact.hero.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-white/90">
                            {t('contact.hero.subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <SectionTitle kicker={t('contact.info.kicker')} title={t('contact.info.title')} />
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-6">
                            {/* Address */}
                            <div className="rounded-2xl border-2 border-green-100 bg-green-50 p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-[#63b32e] flex items-center justify-center text-white">
                                            <FaLocationDot className="text-xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">{t('contact.info.address.title')}</h3>
                                        <p className="text-slate-700">
                                            {t('contact.info.address.value')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-[#0f70b7] flex items-center justify-center text-white">
                                            <FaEnvelope className="text-xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">{t('contact.info.email.title')}</h3>
                                        <a href={`mailto:${t('contact.info.email.value')}`} className="text-[#0f70b7] hover:underline">
                                            {t('contact.info.email.value')}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="rounded-2xl border-2 border-green-100 bg-green-50 p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-[#63b32e] flex items-center justify-center text-white">
                                            <FaPhone className="text-xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">{t('contact.info.phone.title')}</h3>
                                        <a href="tel:+243829495919" className="text-slate-700 hover:text-[#63b32e]">
                                            {t('contact.info.phone.value')}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-[#0f70b7] flex items-center justify-center text-white">
                                            <FaClock className="text-xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">{t('contact.info.hours.title')}</h3>
                                        <p className="text-slate-700">
                                            {t('contact.info.hours.value')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('contact.form.title')}</h2>
                        <form className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        {t('contact.form.name')}
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#63b32e] focus:bg-white"
                                        type="text"
                                        placeholder={t('contact.form.name_placeholder')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        {t('contact.form.email')}
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#63b32e] focus:bg-white"
                                        type="email"
                                        placeholder={t('contact.form.email_placeholder')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    {t('contact.form.subject')}
                                </label>
                                <input
                                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#63b32e] focus:bg-white"
                                    type="text"
                                    placeholder={t('contact.form.subject_placeholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    {t('contact.form.message')}
                                </label>
                                <textarea
                                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#63b32e] focus:bg-white"
                                    rows="5"
                                    placeholder={t('contact.form.message_placeholder')}
                                />
                            </div>
                            <button
                                type="button"
                                className="w-full rounded-lg bg-gradient-to-r from-[#63b32e] to-[#0f70b7] px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:brightness-110 flex items-center justify-center gap-2"
                            >
                                <FaPaperPlane />
                                {t('contact.form.btn')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Google Maps */}
                <div className="mt-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-3">{t('contact.map.title')}</h2>
                        <p className="text-slate-600">{t('contact.map.text')}</p>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.4892345678!2d15.2666667!3d-4.3666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMjInMDAuMCJTIDE1wrAxNicwMC4wIkU!5e0!3m2!1sfr!2scd!4v1234567890"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Better Life ONG Location"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
