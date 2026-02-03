'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative h-[600px] overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-teal-800 to-slate-900 animate-gradient bg-[length:400%_400%]">
                {/* Overlay pattern for texture (optional) */}
                <div className="absolute inset-0 bg-[url('/patterns/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="text-center px-4">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Welcome to
                        <br />
                        <span className="text-emerald-400 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200">
                            Shijin P.S Cars Online
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-emerald-50 mb-8 max-w-2xl mx-auto font-light tracking-wide"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Experience Kerala with Premium Car Rentals
                    </motion.p>

                    <motion.div
                        className="flex gap-4 justify-center flex-wrap"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <a
                            href="/fleet"
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-900/50"
                        >
                            Browse Cars
                        </a>
                        <a
                            href="/contact"
                            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all border border-white/20"
                        >
                            Contact Us
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2 backdrop-blur-sm">
                    <div className="w-1 h-3 bg-white/70 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
