'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/fleet', label: 'Our Vehicles' },
        { href: '/packages', label: 'Packages' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 z-40 w-full transition-all duration-300 border-b border-transparent",
                scrolled
                    ? "glass py-2"
                    : "bg-transparent py-4 border-transparent"
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="rounded-full bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                        <Car className="h-6 w-6 text-primary" />
                    </div>
                    <span className={cn(
                        "text-xl font-bold transition-colors",
                        scrolled ? "text-foreground" : "text-white"
                    )}>
                        Kerala Travels
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-all hover:-translate-y-0.5 relative group",
                                scrolled ? "text-muted-foreground hover:text-primary" : "text-gray-200 hover:text-white"
                            )}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <Button
                        size="sm"
                        className={cn(
                            "transition-all shadow-lg hover:shadow-primary/25 rounded-full px-6",
                            scrolled ? "bg-primary hover:bg-primary-600 text-white" : "bg-white text-primary hover:bg-white/90"
                        )}
                        asChild
                    >
                        <Link href="https://wa.me/919562244888">Book Now</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={cn(
                        "flex items-center space-x-2 md:hidden transition-colors",
                        scrolled ? "text-foreground" : "text-white"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/20"
                    >
                        <div className="container mx-auto flex flex-col space-y-4 px-4 py-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-2 py-1"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Button size="sm" className="w-full bg-primary hover:bg-primary-600 text-white rounded-full">
                                Book Now
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
