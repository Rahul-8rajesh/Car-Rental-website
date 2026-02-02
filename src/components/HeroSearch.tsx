"use client";

import { useState } from "react";
import {
    CarFront,
    Truck,
    Bus,
    Settings2,
    MapPin,
    KeyRound,
    UserCheck,
    Search,
    ArrowRight
} from "lucide-react";

export default function HeroSearch() {
    // Tabs: 1=Type, 2=Subtype, 3=Details
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        category: "",
        subCategory: "",
        location: "",
        driver: "Self Drive",
    });

    const handleSearch = () => {
        const message = `Hi, I am looking for a *${formData.category}* ${formData.subCategory ? `(${formData.subCategory})` : ""}
    Location: ${formData.location}
    Type: ${formData.driver}`;

        // Using the business number from seed/env
        const whatsappUrl = `https://wa.me/919562244888?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const tabs = [
        { id: 1, name: "1. Vehicle Type", icon: <CarFront size={20} /> },
        { id: 2, name: "2. Preference", icon: <Settings2 size={20} /> },
        { id: 3, name: "3. Details", icon: <MapPin size={20} /> },
    ];

    const vehicleTypes = [
        { name: "Cars", icon: <CarFront size={48} strokeWidth={1.5} />, desc: "Sedan, SUV, Hatchback" },
        { name: "Pickup", icon: <Truck size={48} strokeWidth={1.5} />, desc: "For Goods & Utility" },
        { name: "Travels", icon: <Bus size={48} strokeWidth={1.5} />, desc: "Bus, Traveller for Groups" },
    ];

    const subCategories = ["Hatchback", "Sedan", "SUV", "Electric"];

    return (
        <div className="bg-white/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto mt-[-80px] relative z-20 border border-white/40 text-slate-800 animate-in fade-in slide-in-from-bottom-8 duration-500">

            {/* Modern Tab Headers */}
            <div className="flex border-b border-slate-200/60 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setStep(tab.id)}
                        className={`flex-1 pb-4 text-sm md:text-base font-medium transition-all duration-300 relative flex items-center justify-center gap-2
              ${step === tab.id ? "text-emerald-700 font-bold" : "text-slate-500 hover:text-emerald-600"}`}
                    >
                        {tab.icon}
                        {tab.name}
                        {step === tab.id && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-t-full animate-pulse"></span>
                        )}
                    </button>
                ))}
            </div>

            {/* Step 1: Vehicle Type - Premium Cards */}
            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
                    {vehicleTypes.map((type) => (
                        <button
                            key={type.name}
                            onClick={() => {
                                setFormData({ ...formData, category: type.name });
                                setStep(type.name === "Cars" ? 2 : 3);
                            }}
                            className={`p-6 rounded-2xl border text-left transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 flex flex-col items-start gap-4
                ${formData.category === type.name
                                    ? "bg-emerald-50/80 border-emerald-500 shadow-md text-emerald-900"
                                    : "bg-white border-slate-200 hover:border-emerald-300 text-slate-700"}`}
                        >
                            <div className={`p-3 rounded-full ${formData.category === type.name ? 'bg-emerald-200/50 text-emerald-700' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600'} transition-colors duration-300`}>
                                {type.icon}
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold mb-1 ${formData.category === type.name ? "text-emerald-800" : "text-slate-800"}`}>
                                    {type.name}
                                </h3>
                                <p className={`${formData.category === type.name ? "text-emerald-700/70" : "text-slate-500"} text-sm`}>{type.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Step 2: Sub Category - Modern Buttons */}
            {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Select Your Preference</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {subCategories.map((sub) => (
                            <button
                                key={sub}
                                onClick={() => {
                                    setFormData({ ...formData, subCategory: sub });
                                    setStep(3);
                                }}
                                className={`p-4 rounded-xl border font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 text-center
                  ${formData.subCategory === sub
                                        ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 transform scale-105"
                                        : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:text-emerald-700"}`}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Details - Stylish Form */}
            {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <MapPin size={18} className="text-emerald-600" /> Pickup Location
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter City, Airport, or Hotel"
                                className="w-full border border-slate-300 p-4 pl-4 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-lg text-slate-800 placeholder:text-slate-400 shadow-sm"
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <UserCheck size={18} className="text-emerald-600" /> Driver Option
                        </label>
                        <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                            {[
                                { label: "Self Drive", icon: <KeyRound size={20} /> },
                                { label: "With Driver", icon: <UserCheck size={20} /> }
                            ].map((option) => (
                                <button
                                    key={option.label}
                                    onClick={() => setFormData({ ...formData, driver: option.label })}
                                    className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-lg font-bold transition-all duration-300
                   ${formData.driver === option.label
                                            ? "bg-white text-emerald-700 shadow-sm border border-slate-100"
                                            : "text-slate-600 hover:text-emerald-600 hover:bg-white/50"}`}
                                >
                                    {option.icon}
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-5 rounded-xl text-xl font-bold hover:from-emerald-700 hover:to-teal-600 transition-all shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group"
                    >
                        <Search size={24} className="group-hover:scale-110 transition-transform" />
                        <span>Find My Ride</span>
                        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
        </div>
    );
}
