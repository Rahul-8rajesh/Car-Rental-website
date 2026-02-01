"use client";

import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

export default function ViewBookingsPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-10 font-sans">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 font-bold mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>
                <div className="bg-white p-20 rounded-[3rem] shadow-xl text-center border border-gray-100">
                    <Users className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                    <h1 className="text-4xl font-black text-gray-900 mb-4">View Bookings</h1>
                    <p className="text-xl text-gray-500 max-w-md mx-auto">
                        This module is currently being optimized to give you the best experience in managing travel requests.
                    </p>
                </div>
            </div>
        </div>
    );
}
