'use client';

import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function FleetPageContent({ cars }: { cars: any[] }) {
    return (
        <div className="bg-background min-h-screen py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
                    >
                        Our Premium Vehicles
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Choose the perfect vehicle for your journey. From compact cars for city drives to spacious SUVs for family trips, we have it all.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {cars.map((car) => (
                        <motion.div key={car.id} variants={item} className="h-full">
                            <CarCard
                                name={car.name}
                                image={car.image || ''}
                                seats={car.seats || 0}
                                rate={car.rate}
                                transmission={car.transmission}
                                ac={true}
                                luggage={2}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center bg-secondary/5 rounded-3xl p-12"
                >
                    <h2 className="text-2xl font-bold mb-4">Didn't find what you're looking for?</h2>
                    <p className="text-muted-foreground mb-8">We can arrange other vehicles upon special request.</p>
                    <Button size="lg" className="rounded-full px-8" asChild>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
