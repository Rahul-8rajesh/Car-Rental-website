import Hero from "@/components/Hero";
import CarCard from "@/components/CarCard";
import ServiceCard from "@/components/ServiceCard";
import { MapPin, Plane, UserCheck, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featuredCars = [
    {
      name: "Toyota Innova Crysta",
      image: "/cars/crysta.png",
      seats: 7,
      rate: "₹26",
      transmission: "Manual",
      ac: true,
      luggage: 4
    },
    {
      name: "Maruti Suzuki Swift",
      image: "/cars/swift.png",
      seats: 5,
      rate: "₹18",
      transmission: "Manual",
      ac: true,
      luggage: 2
    },
    {
      name: "Force Traveller",
      image: "/cars/traveller.png",
      seats: 17,
      rate: "₹30",
      transmission: "Manual",
      ac: true,
      luggage: 10
    }
  ];

  const services = [
    {
      title: "Airport Pickup & Drop",
      description: "Reliable and punctual airport transfer services to and from all major airports in Kerala.",
      icon: Plane
    },
    {
      title: "Tour Packages",
      description: "Customized tour packages to Munnar, Alappuzha, Thekkady, and other beautiful destinations.",
      icon: MapPin
    },
    {
      title: "Wedding Car Rental",
      description: "Premium luxury cars for your special day. Make your wedding entrance memorable.",
      icon: Calendar // Using Calendar as a proxy for 'Event/Wedding' if needed, or maybe just generic
    },
    {
      title: "Sabarimala Packages",
      description: "Special pilgrimage packages to Sabarimala with experienced drivers familiar with the routes.",
      icon: UserCheck
    }
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the best of travel with our dedicated services tailored to your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      {/* Fleet Preview Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Vehicles</h2>
              <p className="text-gray-600">Top rated vehicles for your comfortable journey</p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/fleet">View All Fleet</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredCars.map((car, index) => (
              <CarCard
                key={index}
                name={car.name}
                image={car.image}
                seats={car.seats}
                rate={car.rate}
                transmission={car.transmission}
                ac={car.ac}
                luggage={car.luggage}
              />
            ))}
          </div>

          <div className="md:hidden flex justify-center">
            <Button asChild variant="outline">
              <Link href="/fleet">View All Fleet</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready for your next journey?</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
              Book your vehicle now and enjoy a hassle-free travel experience across God's Own Country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary-900 hover:bg-gray-100 border-none">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white">
                <Link href="https://wa.me/919562244888">WhatsApp Us</Link>
              </Button>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-800 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-800 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>
        </div>
      </section>
    </div>
  );
}
