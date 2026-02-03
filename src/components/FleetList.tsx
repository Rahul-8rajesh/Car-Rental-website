'use client';

import { motion } from "framer-motion";
import CarCard from "@/components/CarCard";

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

export default function FleetList({ cars }: { cars: any[] }) {
    return (
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
                        ac={true} // Schema doesn't have AC, default true or derived? FleetData had it. Schema has 'features'? No.
                        luggage={2} // Schema doesn't have luggage.
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}
