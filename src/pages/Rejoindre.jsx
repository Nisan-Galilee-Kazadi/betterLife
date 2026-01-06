import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import join_hero from "../images/close-up-black-people-with-hands-joined.jpg";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaBriefcase, FaGlobe, FaFileContract } from "react-icons/fa";

export function Rejoindre() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        membershipType: "",
        civility: "mr",
        lastname: "",
        profession: "",
        nationality: "",
        status: "physique",
        raison_sociale: "",
        id_number: "",
        address: "",
        quartier: "",
        code_postal: "",
        city: "",
        province: "",
        village: "",
        hectare: "",
        country: "",
        phone: "",
        email: "",
        benevolat: "no",
        sectors: [],
        experience: "no",
        experience_details: "",
        why_join: "",
        contributions: [],
        other_contribution_details: "",
        payment_mode: [],
        other_payment_details: "",
        agreement: false,
        date: "",
        signature: ""
    });
    const [status, setStatus] = useState("idle");

    // Strict Validation: Required fields + Membership + Agreement
    // Helper to check if string is not empty
    const isValidString = (s) => s && s.trim().length > 0;

    const isFormValid =
        isValidString(formData.membershipType) &&
        isValidString(formData.lastname) &&
        isValidString(formData.address) &&
        isValidString(formData.code_postal) &&
        isValidString(formData.city) &&
        isValidString(formData.province) &&
        isValidString(formData.country) &&
        isValidString(formData.phone) &&
        isValidString(formData.email) &&
        isValidString(formData.why_join) &&
        (formData.status === 'morale' ? (isValidString(formData.raison_sociale) && isValidString(formData.id_number)) : true) &&
        (formData.experience === 'yes' ? isValidString(formData.experience_details) : true) &&
        (formData.contributions.includes('other') ? isValidString(formData.other_contribution_details) : true) &&
        (formData.payment_mode.includes('other') ? isValidString(formData.other_payment_details) : true) &&
        isValidString(formData.date) &&
        isValidString(formData.signature) &&
        formData.payment_mode.length > 0 &&
        formData.agreement === true;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox" && (name === "sectors" || name === "contributions" || name === "payment_mode")) {
            setFormData(prev => {
                const list = prev[name];
                if (checked) return { ...prev, [name]: [...list, value] };
                return { ...prev, [name]: list.filter(item => item !== value) };
            });
        } else if (type === "checkbox" && name === "agreement") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            // This alerts if they try to hack-enable it or hit enter, but button is disabled anyway
            alert("Veuillez remplir tous les champs obligatoires (y compris Pays et Nationalité) et accepter les conditions.");
            return;
        }
        setStatus("submitting");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            // Reset form could go here
        }, 1500);
    };

    const membershipTypes = [
        "lowIncome", "basic", "accompanying", "supporting", "social", "voluntary"
    ];
    const sectorsList = [
        "food_security", "health_insurance", "large_scale_agri", "machinery",
        "carbon_credits", "medicinal_plants", "fundraising", "env_protection",
        "training_health_agri"
    ];

    const contributionsList = ["financial", "technical", "active_agri", "other"];
    const paymentMethods = ["bank", "card", "cash", "check", "other"];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-zinc-900 py-32 sm:py-48 overflow-hidden">
                <img
                    src={join_hero}
                    alt="Join Better Life"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                        {t("join.hero.title")}
                    </h1>
                    <p className="mt-6 text-xl leading-8 text-white font-medium max-w-2xl mx-auto drop-shadow-xl">
                        {t("join.hero.subtitle")}
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
                {/* Intro / Context */}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-10 rounded-r-lg shadow-sm">
                    <h3 className="font-bold text-orange-800 mb-2 uppercase tracking-wide">Important</h3>
                    <p className="text-orange-900 italic">
                        "{t("join.intro.warning")}"
                    </p>
                    <p className="mt-2 font-semibold text-orange-900">
                        {t("join.intro.call")}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-xl ring-1 ring-gray-900/5 rounded-2xl p-8 sm:p-12 space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 border-b pb-4 mb-8">{t("join.form.title")}</h2>

                        {/* 1. Membership Type - Prominent Table-like Selection */}
                        <div className="mb-12">
                            <h3 className="text-xl font-bold leading-6 text-[#0f70b7] mb-6 flex items-center">
                                <span className="bg-[#0f70b7] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                                {t("join.membershipType.title")}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {membershipTypes.map((type) => (
                                    <label
                                        key={type}
                                        className={`relative flex items-center px-6 py-4 cursor-pointer rounded-xl border-2 transition-all duration-200 group
                                            ${formData.membershipType === type
                                                ? 'border-[#63b32e] bg-green-50/50 shadow-sm'
                                                : 'border-slate-200 hover:border-[#63b32e]/50 hover:bg-slate-50/80'}`}
                                    >
                                        <div className="flex items-center h-5">
                                            <input
                                                type="radio"
                                                name="membershipType"
                                                value={type}
                                                checked={formData.membershipType === type}
                                                onChange={handleChange}
                                                className="h-5 w-5 text-[#63b32e] border-gray-300 focus:ring-[#63b32e]"
                                            />
                                        </div>
                                        <span className={`ml-4 font-bold text-lg flex-grow ${formData.membershipType === type ? 'text-[#63b32e]' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                            {t(`join.membershipType.options.${type}`)}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {!formData.membershipType && (
                                <p className="text-sm text-amber-600 mt-2 font-medium ml-2 animate-pulse">* Veuillez sélectionner un type d'adhésion</p>
                            )}
                        </div>


                        {/* 2. Identification */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 bg-gray-50 p-2 rounded">{t("join.personalInfo.title")}</h3>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.civility")}</label>
                                <select name="civility" value={formData.civility} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4 sm:text-sm sm:leading-6">
                                    <option value="mr">{t("join.personalInfo.mr")}</option>
                                    <option value="mrs">{t("join.personalInfo.mrs")}</option>
                                    <option value="couple">{t("join.personalInfo.couple")}</option>
                                </select>
                            </div>

                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.lastname")}</label>
                                <input type="text" name="lastname" required value={formData.lastname} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>

                            <fieldset className="sm:col-span-full border-t pt-4 mt-2">
                                <legend className="text-sm font-semibold leading-6 text-gray-900">{t("join.personalInfo.who_is_member")}</legend>
                                <div className="mt-2 space-y-3 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                    <div className="flex items-center">
                                        <input id="physique" name="status" type="radio" value="physique" checked={formData.status === "physique"} onChange={handleChange} className="h-4 w-4 border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                        <label htmlFor="physique" className="ml-3 block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.physicalPerson")}</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="morale" name="status" type="radio" value="morale" checked={formData.status === "morale"} onChange={handleChange} className="h-4 w-4 border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                        <label htmlFor="morale" className="ml-3 block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.moralPerson")}</label>
                                    </div>
                                </div>
                            </fieldset>

                            {formData.status === "morale" && (
                                <>
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.raison_sociale")} <span className="text-red-500">*</span></label>
                                        <input type="text" name="raison_sociale" required value={formData.raison_sociale} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.id_number")} <span className="text-red-500">*</span></label>
                                        <input type="text" name="id_number" required value={formData.id_number} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                                    </div>
                                </>
                            )}

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.profession")}</label>
                                <input type="text" name="profession" value={formData.profession} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.nationality")} <span className="text-red-500">*</span></label>
                                <input type="text" name="nationality" required value={formData.nationality} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>

                            {/* Address & Contact */}
                            <div className="sm:col-span-full mt-6">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 bg-gray-50 p-2 rounded">{t("join.addressContact.title")}</h3>
                            </div>

                            <div className="sm:col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.address")} <span className="text-red-500">*</span></label>
                                <div className="relative mt-2">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FaMapMarkerAlt className="h-5 w-5 text-gray-400" /></div>
                                    <input type="text" name="address" required value={formData.address} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]  sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.code_postal")} <span className="text-red-500">*</span></label>
                                <input type="text" name="code_postal" required value={formData.code_postal} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.city")} <span className="text-red-500">*</span></label>
                                <input type="text" name="city" required value={formData.city} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.neighborhood")}</label>
                                <input type="text" name="quartier" value={formData.quartier} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.village")} <span className="text-red-500">*</span></label>
                                <input type="text" name="village" required value={formData.village} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.hectare")} <span className="text-red-500">*</span></label>
                                <input type="text" name="hectare" required value={formData.hectare} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.province")} <span className="text-red-500">*</span></label>
                                <input type="text" name="province" required value={formData.province} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.country")} <span className="text-red-500">*</span></label>
                                <input type="text" name="country" required value={formData.country} onChange={handleChange} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6" />
                            </div>

                            <fieldset className="sm:col-span-full border-t pt-4 mt-2">
                                <legend className="text-sm font-semibold leading-6 text-gray-900">{t("join.personalInfo.benevolat_question")}</legend>
                                <div className="mt-2 space-y-3 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                    <div className="flex items-center">
                                        <input id="ben-yes" name="benevolat" type="radio" value="yes" checked={formData.benevolat === "yes"} onChange={handleChange} className="h-4 w-4 border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                        <label htmlFor="ben-yes" className="ml-3 block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.yes")}</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="ben-no" name="benevolat" type="radio" value="no" checked={formData.benevolat === "no"} onChange={handleChange} className="h-4 w-4 border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                        <label htmlFor="ben-no" className="ml-3 block text-sm font-medium leading-6 text-gray-900">{t("join.personalInfo.no")}</label>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.phone")}</label>
                                <div className="relative mt-2">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FaPhone className="h-5 w-5 text-gray-400 transform rotate-90" /></div>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e] sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">{t("join.addressContact.email")}</label>
                                <div className="relative mt-2">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FaEnvelope className="h-5 w-5 text-gray-400" /></div>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e] sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. & 3. Interests & Payment */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            {/* Payment */}
                            <div className="sm:col-span-full">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 bg-gray-50 p-2 rounded">{t("join.paymentPreference.title")}</h3>
                            </div>
                            <div className="sm:col-span-full">
                                <div className="mt-4 flex flex-wrap gap-4">
                                    {paymentMethods.map(mode => (
                                        <div key={mode} className="relative flex items-center gap-x-3 bg-slate-50 px-3 py-2 rounded border border-slate-200 min-w-[120px]">
                                            <div className="flex h-5 items-center">
                                                <input id={mode} name="payment_mode" type="checkbox" value={mode} checked={formData.payment_mode.includes(mode)} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor={mode} className="font-medium text-gray-900 cursor-pointer">{t(`join.paymentPreference.${mode}`)}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {formData.payment_mode.includes('other') && (
                                    <div className="mt-4">
                                        <label htmlFor="other_payment_details" className="block text-sm font-medium leading-6 text-gray-900">
                                            Précisez votre mode de paiement <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="other_payment_details"
                                            id="other_payment_details"
                                            required
                                            value={formData.other_payment_details}
                                            onChange={handleChange}
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-full mt-4">
                                <p className="text-sm text-[#63b32e] italic font-medium">
                                    "{t("join.paymentPreference.note")}"
                                </p>
                            </div>

                            {/* Sectors */}
                            <div className="sm:col-span-full mt-6">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 bg-gray-50 p-2 rounded">{t("join.sectors.title")}</h3>
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {sectorsList.map(sector => (
                                        <div key={sector} className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id={`sector-${sector}`} name="sectors" type="checkbox" value={sector} checked={formData.sectors.includes(sector)} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor={`sector-${sector}`} className="font-medium text-gray-900">{t(`join.sectors.${sector}`)}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="sm:col-span-full mt-6">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 bg-gray-50 p-2 rounded">{t("join.experience.title")}</h3>
                                <label className="block text-base font-semibold text-gray-900 mt-4">{t("join.experience.question")}</label>
                                <div className="mt-4 flex gap-x-8">
                                    <div className="flex items-center">
                                        <input id="exp-yes" name="experience" type="radio" value="yes" checked={formData.experience === "yes"} onChange={handleChange} className="h-4 w-4 border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                        <label htmlFor="exp-yes" className="ml-3 block text-sm font-medium leading-6 text-gray-900">{t("join.experience.yes")}</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input id="exp-no" name="experience" type="radio" value="no" checked={formData.experience === "no"} onChange={handleChange} className="h-4 w-4 border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                        <label htmlFor="exp-no" className="ml-3 block text-sm font-medium leading-6 text-gray-900">{t("join.experience.no")}</label>
                                    </div>
                                </div>
                            </div>

                            {formData.experience === "yes" && (
                                <div className="sm:col-span-full">
                                    <label htmlFor="experience_details" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t("join.experience.details_label")} <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="experience_details"
                                            name="experience_details"
                                            rows={3}
                                            required={formData.experience === "yes"}
                                            value={formData.experience_details}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="sm:col-span-full pt-4 border-t mt-4">
                                <label htmlFor="why_join" className="block text-sm font-medium leading-6 text-gray-900">
                                    {t("join.experience.why_join_label")} <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="why_join"
                                        name="why_join"
                                        rows={3}
                                        required
                                        value={formData.why_join}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Contributions */}
                            <div className="sm:col-span-full mt-6">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 bg-gray-50 p-2 rounded">{t("join.contributions.title")}</h3>
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {contributionsList.map(contrib => (
                                        <div key={contrib} className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id={`contrib-${contrib}`} name="contributions" type="checkbox" value={contrib} checked={formData.contributions.includes(contrib)} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor={`contrib-${contrib}`} className="font-medium text-gray-900">{t(`join.contributions.${contrib}`)}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {formData.contributions.includes('other') && (
                                    <div className="mt-4">
                                        <label htmlFor="other_contribution_details" className="block text-sm font-medium leading-6 text-gray-900">
                                            Précisez votre apport <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="other_contribution_details"
                                            id="other_contribution_details"
                                            required
                                            value={formData.other_contribution_details}
                                            onChange={handleChange}
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4   pl-4   pl-4   pl-4   pl-4   pl-4 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* 5. Engagement */}
                    <div className="pb-6">
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 bg-gray-50 p-2 rounded">{t("join.cgu.title")}</h3>
                        <div className="mt-6 flex gap-x-3 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                            <div className="flex h-6 items-center">
                                <input id="agreement" name="agreement" type="checkbox" checked={formData.agreement} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-[#63b32e] focus:ring-[#63b32e]" />
                            </div>
                            <div className="text-sm leading-6">
                                <p className="text-gray-900 font-medium whitespace-pre-line">{t("join.cgu.text")}</p>
                                <div className="flex flex-col mt-2">
                                    <p className="text-gray-500 font-bold">{t("join.cgu.readAndApproved")}</p>
                                    <Link to="/conditions" className="text-sm font-semibold text-[#63b32e] hover:underline mt-1 flex items-center" target="_blank">
                                        <FaFileContract className="mr-1" />
                                        {t("conditions.title")}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                    {t("join.cgu.date")} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="mt-2 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 bg-slate-50/50 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="signature" className="block text-sm font-medium leading-6 text-gray-900">
                                    {t("join.cgu.signature")} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="signature"
                                    id="signature"
                                    required
                                    placeholder={t("join.cgu.signaturePlaceholder")}
                                    value={formData.signature}
                                    onChange={handleChange}
                                    className={`mt-2 block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 bg-slate-50/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63b32e]   pl-4 sm:text-sm sm:leading-6 ${formData.signature ? 'font-script text-lg' : ''
                                        }`}
                                    style={{ fontFamily: formData.signature ? '"Dancing Script", cursive' : 'inherit' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Annuler</button>
                        <button
                            type="submit"
                            disabled={!isFormValid || status === "submitting"}
                            className={`rounded-full px-8 py-3 text-sm font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#63b32e] transition-all transform ${isFormValid ? 'bg-[#63b32e] hover:bg-[#529426] hover:scale-105' : 'bg-gray-400 cursor-not-allowed opacity-70'}`}
                            title={!isFormValid ? "Veuillez remplir tous les champs obligatoires" : ""}
                        >
                            {status === "submitting" ? t("join.cgu.submitting") : t("join.cgu.submit")}
                        </button>
                    </div>

                    {status === "success" && (
                        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center font-semibold animate-bounce">
                            {t("join.form.success")}
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}

