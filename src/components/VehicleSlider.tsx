'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Vehicle {
    id: number;
    name: string;
    model?: string;
    rate: string;
    image: string;
    transmission?: string;
    seats?: number;
}

interface VehicleSliderProps {
    title: string;
    vehicles: Vehicle[];
    onBookClick: (vehicle: Vehicle) => void;
}

export default function VehicleSlider({ title, vehicles, onBookClick }: VehicleSliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (vehicles.length === 0) return null;

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-6 h-6 text-emerald-600" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-6 h-6 text-emerald-600" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {vehicles.map((vehicle, index) => (
                        <motion.div
                            key={vehicle.id}
                            className="flex-shrink-0 w-[300px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative h-48 bg-gray-200">
                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {vehicle.transmission && (
                                        <span className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {vehicle.transmission}
                                        </span>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{vehicle.name}</h3>
                                    {vehicle.model && (
                                        <p className="text-sm text-gray-500 mb-3">{vehicle.model}</p>
                                    )}

                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-2xl font-bold text-emerald-600">{vehicle.rate}</p>
                                            <p className="text-xs text-gray-500">per day</p>
                                        </div>
                                        {vehicle.seats && (
                                            <div className="text-sm text-gray-600">
                                                <span className="font-semibold">{vehicle.seats}</span> Seats
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => onBookClick(vehicle)}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
