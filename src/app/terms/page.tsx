"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Camera, CreditCard, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-primary-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-primary-900/90 z-10" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="container relative z-20 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center mb-4"
                    >
                        <Shield className="w-16 h-16 text-white" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                    >
                        Rental Requirements & Terms
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-primary-100 text-lg max-w-2xl mx-auto"
                    >
                        Please review our rental policies and requirements before booking
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Damage Policy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 mb-8"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-red-50 p-4 rounded-2xl">
                                <Shield className="w-8 h-8 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Damage Policy</h2>
                                <p className="text-gray-500 font-medium">Important information about vehicle responsibility</p>
                            </div>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-2xl">
                            <p className="text-gray-800 leading-relaxed text-lg">
                                In case of any damage to the vehicle, the customer is <strong>fully responsible</strong> to either repair the vehicle at an authorized service center or pay the full cost of the repair estimated by the company.
                            </p>
                        </div>
                    </motion.div>

                    {/* Documents Required */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-start gap-4 mb-8">
                            <div className="bg-primary-50 p-4 rounded-2xl">
                                <FileText className="w-8 h-8 text-primary-700" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Documents Required</h2>
                                <p className="text-gray-500 font-medium">Please bring the following original documents</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Driving License */}
                            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="bg-white p-3 rounded-xl shadow-sm">
                                    <CreditCard className="w-6 h-6 text-primary-700" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        Valid Original Driving License
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </h3>
                                    <p className="text-gray-600">A valid driving license issued by the Government of India is mandatory for all rentals.</p>
                                </div>
                            </div>

                            {/* Aadhaar Card */}
                            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="bg-white p-3 rounded-xl shadow-sm">
                                    <CreditCard className="w-6 h-6 text-primary-700" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        Original Aadhaar Card
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </h3>
                                    <p className="text-gray-600">Your original Aadhaar card is required for identity verification purposes.</p>
                                </div>
                            </div>

                            {/* Photograph */}
                            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="bg-white p-3 rounded-xl shadow-sm">
                                    <Camera className="w-6 h-6 text-primary-700" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        One Passport Size Photograph
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </h3>
                                    <p className="text-gray-600">A recent passport-size photograph is required for our records.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 bg-primary-900 rounded-3xl p-10 text-center text-white relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Book Your Journey?</h3>
                            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
                                Have your documents ready and book your vehicle or tour package today!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="bg-white text-primary-900 hover:bg-gray-100 rounded-2xl px-8 h-14 text-lg font-semibold">
                                    <Link href="/fleet">Browse Fleet</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-2xl px-8 h-14 text-lg font-semibold">
                                    <Link href="/packages">View Packages</Link>
                                </Button>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-800 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 blur-2xl" />
                        <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary-800 rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 blur-2xl" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
