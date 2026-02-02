'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface Vehicle {
    id: string;
    name: string;
    model?: string;
    rate: string;
}

interface BookingModalProps {
    vehicle: Vehicle | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ vehicle, isOpen, onClose }: BookingModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        location: '',
        needDriver: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !vehicle) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Save booking to database
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: formData.name,
                    phoneNumber: formData.phone, // Changed from customerPhone
                    date: formData.date,
                    location: formData.location,
                    needDriver: formData.needDriver,
                    vehicleName: vehicle.name, // Changed from carId
                }),
            });

            if (response.ok) {
                // Generate WhatsApp message
                const message = `Hi, I want to book the *${vehicle.name}*${vehicle.model ? ` (${vehicle.model})` : ''}
        
📅 Date: ${formData.date}
📍 Location: ${formData.location}
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
🚗 Driver: ${formData.needDriver ? 'Yes, I need a driver' : 'Self Drive'}

Please confirm availability.`;

                const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');

                onClose();
                setFormData({ name: '', phone: '', date: '', location: '', needDriver: false });
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to submit booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Book {vehicle.name}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pickup Date *
                        </label>
                        <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pickup Location *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="e.g., Kochi Airport"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="needDriver"
                            checked={formData.needDriver}
                            onChange={(e) => setFormData({ ...formData, needDriver: e.target.checked })}
                            className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor="needDriver" className="text-sm font-medium text-gray-700">
                            I need a driver
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                        {isSubmitting ? 'Submitting...' : 'Continue to WhatsApp'}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                        You'll be redirected to WhatsApp to confirm your booking
                    </p>
                </form>
            </div>
        </div>
    );
}
