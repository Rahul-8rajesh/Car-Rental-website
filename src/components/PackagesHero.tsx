'use client';

import { motion } from "framer-motion";

export default function PackagesHero() {
    return (
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
    );
}
