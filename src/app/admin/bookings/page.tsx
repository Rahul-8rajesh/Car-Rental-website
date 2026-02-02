'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Booking {
    id: number;
    customerName: string;
    customerPhone: string;
    pickupDate: string;
    pickupLocation: string;
    needDriver: boolean;
    vehicleType?: string;
    status: string;
    car?: {
        name: string;
    };
    createdAt: string;
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings');
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, status: string) => {
        try {
            await fetch('/api/bookings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            });
            fetchBookings();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (loading) {
        return <div className="p-8">Loading bookings...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Booking Inquiries</h1>

            {bookings.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center text-gray-500">
                        No bookings yet
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {bookings.map((booking) => (
                        <Card key={booking.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl">
                                        {booking.car?.name || booking.vehicleType || 'Vehicle'}
                                    </CardTitle>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Customer</p>
                                        <p className="font-semibold">{booking.customerName}</p>
                                        <p className="text-sm text-gray-600">{booking.customerPhone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Pickup Details</p>
                                        <p className="font-semibold">{booking.pickupDate}</p>
                                        <p className="text-sm text-gray-600">{booking.pickupLocation}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Driver</p>
                                        <p className="font-semibold">{booking.needDriver ? 'Required' : 'Self Drive'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Booked On</p>
                                        <p className="font-semibold">{new Date(booking.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <select
                                        value={booking.status}
                                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                                        className="px-3 py-2 border rounded-lg"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    <a
                                        href={`https://wa.me/${booking.customerPhone.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        WhatsApp
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
