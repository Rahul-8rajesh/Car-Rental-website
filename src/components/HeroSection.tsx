'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const keralaImages = [
    '/images/kerala-backwaters.jpg',
    '/images/kerala-tea-gardens.jpg',
    '/images/kerala-coconut-trees.jpg',
];

export default function HeroSection() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % keralaImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-[600px] overflow-hidden">
            {/* Background Image Carousel */}
            <div className="absolute inset-0">
                {keralaImages.map((image, index) => (
                    <motion.div
                        key={image}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${image})`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImage ? 1 : 0 }}
                        transition={{ duration: 1.5 }}
                    />
                ))}
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="text-center px-4">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Welcome to
                        <br />
                        <span className="text-emerald-400">Shijin P.S Cars Online</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
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
                            href="#cars"
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                        >
                            Browse Cars
                        </a>
                        <a
                            href="#contact"
                            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-all border border-white/30"
                        >
                            Contact Us
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-white/70 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
