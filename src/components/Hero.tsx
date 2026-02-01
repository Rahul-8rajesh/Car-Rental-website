'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
            {/* Background Image with Parallax/Zoom Effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/90" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center text-center">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block rounded-full bg-primary-500/20 px-4 py-1.5 text-sm font-medium text-primary-200 backdrop-blur-md border border-primary-500/30 mb-6">
                            ✨ Premier Travel Experience in Kerala
                        </span>
                    </motion.div>

                    <motion.h1
                        className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Premium Car Rentals & <br className="hidden sm:block" />
                        <span className="text-gradient-gold drop-shadow-lg">Trip Packages</span>
                    </motion.h1>

                    <motion.p
                        className="mx-auto mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl font-light leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Explore God's Own Country with our fleet of luxury and comfort vehicles.
                        Tailored packages for Munnar, Alappuzha, and Sabarimala.
                    </motion.p>

                    <motion.div
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Button size="lg" className="h-12 px-8 w-full sm:w-auto text-lg rounded-full bg-primary hover:bg-primary-600 shadow-xl shadow-primary/25 transition-all hover:scale-105" asChild>
                            <Link href="/fleet">View Fleet</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 w-full sm:w-auto text-lg rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105" asChild>
                            <Link href="/packages">View Packages</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
