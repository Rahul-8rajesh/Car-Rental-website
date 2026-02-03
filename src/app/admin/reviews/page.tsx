"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Trash2, Star, User, MessageSquare, X } from "lucide-react";

interface Review {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    status: string;
    createdAt: string;
}

export default function ManageReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews');
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'APPROVED' })
            });
            if (res.ok) fetchReviews();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this review?")) {
            try {
                await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
                fetchReviews();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-6">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center text-blue-600 hover:text-white hover:bg-blue-600 px-6 py-4 rounded-2xl font-bold transition-all border-2 border-blue-600 group text-lg"
                    >
                        <ArrowLeft className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Link>
                    <div className="text-gray-400 text-sm font-bold uppercase tracking-widest hidden sm:block">Admin Console</div>
                </div>

                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Manage Reviews</h1>
                    <p className="text-gray-500 font-medium">Approve customer testimonials to display them on your website.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className={`bg-white rounded-[2rem] p-8 shadow-sm border-2 transition-all ${review.status === 'PENDING' ? 'border-amber-300 ring-4 ring-amber-50' : 'border-gray-100 hover:shadow-lg'}`}>
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 leading-none">{review.customerName}</h3>
                                            <div className="flex text-yellow-400 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        {review.status === 'PENDING' && (
                                            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold ml-auto md:ml-4">PENDING APPROVAL</span>
                                        )}
                                        {review.status === 'APPROVED' && (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ml-auto md:ml-4">LIVE</span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 italic bg-gray-50 p-4 rounded-xl mt-4">
                                        "{review.comment}"
                                    </p>
                                </div>
                                <div className="flex md:flex-col gap-3 justify-center min-w-[140px]">
                                    {review.status === 'PENDING' && (
                                        <button
                                            onClick={() => handleApprove(review.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all flex-1"
                                        >
                                            <Check className="w-4 h-4" />
                                            Approve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all flex-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {reviews.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                            <MessageSquare className="w-20 h-20 text-gray-200 mx-auto mb-4" />
                            <p className="text-2xl font-bold text-gray-400">No reviews found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
