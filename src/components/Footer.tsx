import Link from 'next/link';
import { Car, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full border-t bg-gray-50 py-12 md:py-16">
            <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Brand Column */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <Car className="h-6 w-6 text-primary-600" />
                        <span className="text-xl font-bold text-gray-900">Kerala Travels</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Premium car rentals and memorable travel experiences in Chengannur, Kerala.
                        Reliable service, affordable rates.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col space-y-4">
                    <h3 className="font-semibold text-gray-900">Quick Links</h3>
                    <Link href="/" className="text-sm text-gray-500 hover:text-primary-600">Home</Link>
                    <Link href="/fleet" className="text-sm text-gray-500 hover:text-primary-600">Our Fleet</Link>
                    <Link href="/packages" className="text-sm text-gray-500 hover:text-primary-600">Packages</Link>
                    <Link href="/contact" className="text-sm text-gray-500 hover:text-primary-600">Contact Us</Link>
                    <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-600">Terms & Conditions</Link>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col space-y-4">
                    <h3 className="font-semibold text-gray-900">Contact Us</h3>
                    <div className="flex items-start space-x-2 text-sm text-gray-500">
                        <MapPin className="h-5 w-5 shrink-0 text-primary-500" />
                        <span>Chengannur, Kerala 689121</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Phone className="h-5 w-5 text-primary-500" />
                        <span>+91 95622 44888</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Mail className="h-5 w-5 text-primary-500" />
                        <span>info@keralatravels.com</span>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col space-y-4">
                    <h3 className="font-semibold text-gray-900">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-gray-400 hover:text-primary-500">
                            <Instagram className="h-6 w-6" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-primary-500">
                            <Facebook className="h-6 w-6" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-primary-500">
                            <Twitter className="h-6 w-6" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-12 border-t px-4 pt-8 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Kerala Travels. All rights reserved.
            </div>
        </footer>
    );
}
