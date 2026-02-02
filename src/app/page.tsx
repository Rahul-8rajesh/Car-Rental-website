'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import VehicleSlider from '@/components/VehicleSlider';
import BookingModal from '@/components/BookingModal';
import { PrismaClient } from '@prisma/client';

interface Vehicle {
  id: number;
  name: string;
  model?: string;
  rate: string;
  image: string;
  transmission?: string;
  seats?: number;
  category?: {
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  cars: Vehicle[];
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col">
      <HeroSection />

      {loading ? (
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading vehicles...</p>
        </div>
      ) : (
        <>
          {/* Vehicle Categories */}
          {categories.map((category) => (
            <VehicleSlider
              key={category.id}
              title={category.name}
              vehicles={category.cars}
              onBookClick={handleBookClick}
            />
          ))}

          {categories.length === 0 && (
            <div className="container mx-auto px-4 py-20 text-center">
              <p className="text-gray-600 text-lg">
                No vehicles available yet. Please check back later or contact us directly.
              </p>
            </div>
          )}
        </>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready for your next journey?</h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
              Book your vehicle now and enjoy a hassle-free travel experience across God's Own Country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Contact Us
              </a>
              <a
                href="https://wa.me/919562244888"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-700 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-700 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
