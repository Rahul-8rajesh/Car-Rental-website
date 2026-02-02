import { PrismaClient } from "@prisma/client";
import HeroSearch from "@/components/HeroSearch";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

const prisma = new PrismaClient();

// Fetch cars directly from the database
async function getCars() {
  const cars = await prisma.car.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6,
  });
  return cars;
}

export default async function Home() {
  const cars = await getCars();

  return (
    <main className="min-h-screen bg-gray-50">

      {/* 1. Hero Section with Kerala Theme */}
      <HeroSection />

      {/* 2. EVM Style Search Widget */}
      <div className="px-4 relative z-20 container mx-auto">
        <HeroSearch />
      </div>

      {/* 3. Latest Vehicles from Database */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">
          Our <span className="text-emerald-600">Vehicles</span>
        </h2>

        {cars.length === 0 ? (
          <p className="text-center text-gray-500">No cars added yet. Please add from Admin Panel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
                {/* Image */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                  <span className="absolute top-2 right-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded font-medium">
                    {car.transmission}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="text-xs text-emerald-600 font-bold uppercase tracking-wide mb-1">
                    {car.category} {car.subCategory && `• ${car.subCategory}`}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{car.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{car.model || "Latest Model"}</p>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-lg font-bold text-emerald-600">₹{car.price}</span>
                      <span className="text-xs text-gray-400 font-medium">/day</span>
                    </div>
                    <Link
                      href={`https://wa.me/919562244888?text=${encodeURIComponent(`Hi, I want to book ${car.name}`)}`}
                      target="_blank"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center py-4 bg-gray-100">
        <Link href="/admin/cars" className="text-sm text-gray-500 hover:text-emerald-600 underline">
          Manage Vehicles
        </Link>
      </div>

    </main>
  );
}
