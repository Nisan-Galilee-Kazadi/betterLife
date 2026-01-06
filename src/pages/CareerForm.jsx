import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaFileAlt, FaPaperPlane } from "react-icons/fa";

export function CareerForm() {
    const { t } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();

    // Determine type from path: /postuler/emploi or /postuler/stage
    const isInternship = location.pathname.includes("stage");
    const applicationType = isInternship ? "internship" : "job";

    const [formData, setFormData] = useState({
        type: applicationType,
        civility: "mr",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        country: "",
        education: "",
        experience: "",
        cv: "",
        motivation: "",
        agreement: false,
        date: new Date().toISOString().split('T')[0],
        signature: ""
    });

    const [status, setStatus] = useState("idle");

    const isValidString = (s) => s && s.trim().length > 0;

    const isFormValid =
        isValidString(formData.lastname) &&
        isValidString(formData.email) &&
        isValidString(formData.phone) &&
        isValidString(formData.education) &&
        isValidString(formData.motivation) &&
        isValidString(formData.signature) &&
        formData.agreement === true;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        setStatus("submitting");
        setTimeout(() => {
            setStatus("success");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#63b32e] to-[#0f70b7] py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        {isInternship ? t("career.hero.titleInternship") : t("career.hero.titleJob")}
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-white/90 max-w-2xl mx-auto">
                        {t("career.hero.subtitle")}
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
                {status === "success" ? (
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                            <FaPaperPlane className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-900 mb-4">{t("career.form.success")}</h2>
                        <button
                            onClick={() => navigate("/emplois-stages")}
                            className="text-[#63b32e] font-semibold hover:underline"
                        >
                            Retour aux offres
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white shadow-xl ring-1 ring-gray-900/5 rounded-2xl p-8 sm:p-12 space-y-10">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold leading-7 text-gray-900 border-b pb-4 mb-8">
                                    {t("career.form.title")}
                                </h2>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                    {/* Personal Info */}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.civility")}</label>
                                        <select name="civility" value={formData.civility} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4">
                                            <option value="mr">{t("join.personalInfo.mr")}</option>
                                            <option value="mrs">{t("join.personalInfo.mrs")}</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.lastname")} <span className="text-red-500">*</span></label>
                                        <div className="relative mt-2">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FaUser className="h-4 w-4 text-gray-400" /></div>
                                            <input type="text" name="lastname" required value={formData.lastname} onChange={handleChange} className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.email")} <span className="text-red-500">*</span></label>
                                        <div className="relative mt-2">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FaEnvelope className="h-4 w-4 text-gray-400" /></div>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.phone")} <span className="text-red-500">*</span></label>
                                        <div className="relative mt-2">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FaPhone className="h-4 w-4 text-gray-400 transform rotate-90" /></div>
                                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4" />
                                        </div>
                                    </div>

                                    {/* Education & Experience */}
                                    <div className="sm:col-span-full">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("career.form.education")} <span className="text-red-500">*</span></label>
                                        <div className="relative mt-2">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FaGraduationCap className="h-4 w-4 text-gray-400" /></div>
                                            <input type="text" name="education" required placeholder={t("career.form.educationPlaceholder")} value={formData.education} onChange={handleChange} className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-full">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("career.form.experience")}</label>
                                        <div className="relative mt-2">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FaBriefcase className="h-4 w-4 text-gray-400" /></div>
                                            <input type="text" name="experience" placeholder={t("career.form.experiencePlaceholder")} value={formData.experience} onChange={handleChange} className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-full">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("career.form.cv")} <span className="text-gray-400 text-xs">(Lien ou Nom)</span></label>
                                        <div className="relative mt-2">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FaFileAlt className="h-4 w-4 text-gray-400" /></div>
                                            <input type="text" name="cv" placeholder={t("career.form.cvPlaceholder")} value={formData.cv} onChange={handleChange} className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-full">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("career.form.motivation")} <span className="text-red-500">*</span></label>
                                        <textarea
                                            name="motivation"
                                            rows={4}
                                            required
                                            placeholder={t("career.form.motivationPlaceholder")}
                                            value={formData.motivation}
                                            onChange={handleChange}
                                            className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Engagement */}
                            <div className="pt-8 border-t">
                                <div className="flex gap-x-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <div className="flex h-6 items-center">
                                        <input id="agreement" name="agreement" type="checkbox" checked={formData.agreement} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <p className="text-gray-900 font-medium">{t("join.cgu.text")}</p>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.cgu.date")}</label>
                                        <input type="date" name="date" value={formData.date} disabled className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-500 bg-gray-50 ring-1 ring-inset ring-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.cgu.signature")} <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="signature"
                                            required
                                            placeholder={t("join.cgu.signaturePlaceholder")}
                                            value={formData.signature}
                                            onChange={handleChange}
                                            className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 font-script"
                                            style={{ fontFamily: formData.signature ? '"Dancing Script", cursive' : 'inherit' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={!isFormValid || status === "submitting"}
                                className={`rounded-full px-10 py-3 text-sm font-bold text-white shadow-sm transition-all transform ${isFormValid ? 'bg-[#63b32e] hover:bg-[#529426] hover:scale-105' : 'bg-gray-400 cursor-not-allowed opacity-70'}`}
                            >
                                {status === "submitting" ? "Envoi..." : t("career.form.submit")}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
