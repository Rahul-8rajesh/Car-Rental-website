'use client';

import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const fleetData = [
    {
        id: "swift-manual",
        name: "Maruti Suzuki Swift",
        image: "/cars/swift.png",
        seats: 5,
        ratePerKm: "₹18",
        transmission: "Manual",
        ac: true,
        luggage: 2
    },
    {
        id: "swift-auto",
        name: "Maruti Suzuki Swift",
        image: "/cars/swift-white.png",
        seats: 5,
        ratePerKm: "₹20",
        transmission: "Automatic",
        ac: true,
        luggage: 2
    },
    {
        id: "innova",
        name: "Toyota Innova",
        image: "/cars/innova.png",
        seats: 7,
        ratePerKm: "₹22",
        transmission: "Manual",
        ac: true,
        luggage: 4
    },
    {
        id: "innova-crysta",
        name: "Toyota Innova Crysta",
        image: "/cars/crysta.png",
        seats: 7,
        ratePerKm: "₹26",
        transmission: "Manual",
        ac: true,
        luggage: 4
    },
    {
        id: "traveller",
        name: "Force Traveller",
        image: "/cars/traveller.png",
        seats: 17,
        ratePerKm: "₹30",
        transmission: "Manual",
        ac: true,
        luggage: 10
    },
    {
        id: "pickup",
        name: "Intra Pickup",
        image: "/cars/pickup.png",
        seats: 2,
        ratePerKm: "Call for Quote",
        transmission: "Manual",
        ac: false,
        luggage: 20
    }
];

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

export default function FleetPage() {
    return (
        <div className="bg-background min-h-screen py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
                    >
                        Our Premium Fleet
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
                    {fleetData.map((car) => (
                        <motion.div key={car.id} variants={item} className="h-full">
                            <CarCard
                                name={car.name}
                                image={car.image}
                                seats={car.seats}
                                rate={car.ratePerKm}
                                transmission={car.transmission}
                                ac={car.ac}
                                luggage={car.luggage}
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
