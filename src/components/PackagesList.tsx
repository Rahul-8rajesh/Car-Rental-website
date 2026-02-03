'use client';

import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Package {
    id: string;
    title: string;
    description: string;
    price: string;
    duration: string;
    location: string;
    features: string[];
    image: string | null;
}

const WHATSAPP_NUMBER = "919562244888";

export default function PackagesList({ packages }: { packages: Package[] }) {
    if (packages.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-gray-500">No packages available at the moment.</p>
            </div>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => {
                        const whatsappMessage = `Hi, I am interested in booking ${pkg.title}. Is it available?`;

                        return (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                {pkg.image && (
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}

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
                                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
