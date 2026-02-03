import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Kerala Travels",
    description: "Get in touch with us for bookings and enquiries. Visit our office in Chengannur or contact us via WhatsApp/Phone.",
};


export default function ContactPage() {
    return (
        <div className="min-h-screen py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary/5 z-0" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contact Us</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions or want to book a trip? Reach out to us and we'll be happy to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <Card className="glass border-white/20 shadow-xl backdrop-blur-md bg-white/40">
                            <CardHeader>
                                <CardTitle className="text-2xl text-foreground">Get in Touch</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground mb-1">Our Office</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Kerala Travels & Rentals,<br />
                                            MC Road, Chengannur,<br />
                                            Kerala, India - 689121
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground mb-1">Phone & WhatsApp</h3>
                                        <p className="text-muted-foreground mb-1">+91 95622 44888</p>
                                        <p className="text-sm text-muted-foreground/80">Mon-Sat 9am to 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground mb-1">Email Us</h3>
                                        <a href="mailto:Shinjinps@gmail.com" className="text-muted-foreground hover:text-primary transition-colors block">
                                            Shinjinps@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Facebook className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground mb-1">Follow Us</h3>
                                        <Link href="https://www.facebook.com/share/1DdM4SFQ5e/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors block">
                                            Facebook Page
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Map Placeholder */}
                        <div className="h-80 rounded-3xl overflow-hidden relative shadow-lg border border-white/20">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.460882037146!2d76.61361131479862!3d9.317929993319808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062298c4126c8b%3A0xb3a8b4172f8832!2sChengannur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1675765432103!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="glass border-white/20 shadow-2xl backdrop-blur-md bg-white/60 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                        <CardHeader className="relative z-10">
                            <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                                        <Input id="name" placeholder="Your name" className="bg-white/50 border-white/30 focus:bg-white transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</label>
                                        <Input id="phone" placeholder="Your phone number" className="bg-white/50 border-white/30 focus:bg-white transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email (Optional)</label>
                                    <Input id="email" type="email" placeholder="your@email.com" className="bg-white/50 border-white/30 focus:bg-white transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="service" className="text-sm font-medium text-foreground">Interested In</label>
                                    <select
                                        id="service"
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-white/30 bg-white/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:bg-white transition-all"
                                    >
                                        <option>Car Rental</option>
                                        <option>Tour Package</option>
                                        <option>Airport Transfer</option>
                                        <option>Wedding Car</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                                    <Textarea id="message" placeholder="Tell us about your travel plans..." className="h-32 bg-white/50 border-white/30 focus:bg-white transition-all" />
                                </div>

                                <Button type="button" className="w-full h-12 text-lg bg-primary hover:bg-primary-600 shadow-lg shadow-primary/25 rounded-xl transition-all hover:scale-[1.02]">
                                    Send Message
                                </Button>
                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    We usually respond within 1 hour during business hours.
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
