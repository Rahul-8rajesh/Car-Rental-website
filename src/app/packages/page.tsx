"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ⚠️ IMPORTANT: Replace this placeholder number with your actual WhatsApp business number
// Format: 91XXXXXXXXXX (country code + 10 digit number without any spaces or special characters)
const WHATSAPP_NUMBER = "919562244888"; // 👈 Change this to your real number

const tourPackages = [
    {
        id: 1,
        title: "Munnar Trip - 3 Days",
        description: "Explore the misty hills of Munnar, tea gardens, and waterfalls. Includes sightseeing and comfortable transfers.",
        price: "From ₹8,500",
        duration: "3 Days / 2 Nights",
        location: "Munnar, Kerala",
        features: ["Tea Garden Visit", "Eravikulam National Park", "Mattupetty Dam"],
        whatsappMessage: "Hi, I am interested in booking Munnar Trip - 3 Days. Is it available?"
    },
    {
        id: 2,
        title: "Sabarimala Special Package",
        description: "Conducted pilgrimage trips with experienced drivers. Safe and comfortable journey for devotees.",
        price: "From ₹12,000",
        duration: "Flexible",
        location: "Pamba / Nilakkal",
        features: ["Experienced Drivers", "Multi-point pickups", "Well-maintained vehicles"],
        whatsappMessage: "Hi, I am interested in booking Sabarimala Special Package. Is it available?"
    },
    {
        id: 3,
        title: "Airport Transfer - Kochi",
        description: "Reliable 24/7 airport pickup and drop services. Punctual and professional drivers.",
        price: "From ₹1,200",
        duration: "Point-to-Point",
        location: "Kochi Airport (COK)",
        features: ["24/7 Service", "Flight Monitoring", "No Hidden Charges"],
        whatsappMessage: "Hi, I am interested in booking Airport Transfer - Kochi. Is it available?"
    },
    {
        id: 4,
        title: "Wayanad Exploration",
        description: "Discover the wilderness of Wayanad. Visit Edakkal Caves, Banasura Sagar Dam, and more.",
        price: "From ₹10,500",
        duration: "4 Days / 3 Nights",
        location: "Wayanad, Kerala",
        features: ["Trekking", "Caves Visit", "Wildlife Sanctuary"],
        whatsappMessage: "Hi, I am interested in booking Wayanad Exploration. Is it available?"
    },
    {
        id: 5,
        title: "Thekkady - Wildlife & Boating",
        description: "Experience the Periyar National Park, spice plantations, and elephant rides.",
        price: "From ₹9,000",
        duration: "2 Days / 1 Night",
        location: "Thekkady, Kerala",
        features: ["Lake Boating", "Elephant Safari", "Spice Garden Tour"],
        whatsappMessage: "Hi, I am interested in booking Thekkady - Wildlife & Boating. Is it available?"
    },
    {
        id: 6,
        title: "Kumarakom Houseboat Stay",
        description: "Authentic Kuttanad experience with a stay in a luxury houseboat on the backwaters.",
        price: "From ₹15,000",
        duration: "2 Days / 1 Night",
        location: "Kumarakom, Kerala",
        features: ["Luxury Houseboat", "Traditional Meals", "Backwater Cruise"],
        whatsappMessage: "Hi, I am interested in booking Kumarakom Houseboat Stay. Is it available?"
    }
];

export default function PackagesPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-primary-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-primary-900/80 z-10" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="container relative z-20 px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
                    >
                        Premium Tour Packages
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Experience God's Own Country with our curated travel experiences and premium chauffeur services.
                    </motion.p>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tourPackages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 mb-4 uppercase tracking-wider">
                                                {pkg.location}
                                            </span>
                                            <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-primary-700 transition-colors">
                                                {pkg.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6 line-clamp-2">
                                        {pkg.description}
                                    </p>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="w-4 h-4 mr-2 text-primary-500" />
                                            {pkg.duration}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                                            {pkg.location}
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-8 flex-grow">
                                        {pkg.features.slice(0, 3).map((feature, i) => (
                                            <li key={i} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-6 border-t border-gray-100 mt-auto">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-sm text-gray-500 font-medium">Starting from</span>
                                            <span className="text-2xl font-bold text-primary-900">{pkg.price}</span>
                                        </div>

                                        <Button
                                            asChild
                                            className="w-full bg-primary-900 hover:bg-primary-800 text-white py-6 rounded-2xl group/btn"
                                        >
                                            <Link
                                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pkg.whatsappMessage)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <MessageCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                                Book Now via WhatsApp
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Banner */}
            <section className="container mx-auto px-4 pb-20">
                <div className="bg-primary-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Package?</h2>
                        <p className="text-primary-100 mb-8 max-w-xl text-lg">
                            We can tailor-make your Kerala experience exactly how you want it. Contact us for a personalized quote.
                        </p>
                        <Button asChild size="lg" className="bg-white text-primary-900 hover:bg-gray-100 border-none rounded-2xl px-10 h-16 text-lg font-semibold">
                            <Link href="/contact">Talk to our Travel Experts</Link>
                        </Button>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-800 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 blur-2xl" />
                    <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary-800 rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 blur-2xl" />
                </div>
            </section>
        </div>
    );
}
