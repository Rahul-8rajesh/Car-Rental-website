'use client';

import { useState, useEffect } from "react";
import { Star, User, X, MessageSquare, CheckCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ReviewsSection() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // Success state
    const [formData, setFormData] = useState({ name: "", rating: 5, comment: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/api/reviews?public=true');
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error("Error fetching reviews", error);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.comment) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: formData.name,
                    rating: formData.rating,
                    comment: formData.comment
                })
            });
            if (res.ok) {
                setIsSubmitted(true); // Show success message
                setFormData({ name: "", rating: 5, comment: "" });
            } else {
                alert('Failed to submit review');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsSubmitted(false); // Reset/Clear success state when closing
    };

    return (
        <section className="py-20 bg-emerald-900 text-white relative overflow-hidden" id="reviews">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Customer <span className="text-emerald-400">Stories</span></h2>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        See what our travelers have to say about their journey with us.
                    </p>
                </div>

                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {reviews.map((review) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-emerald-800/50 backdrop-blur-sm p-8 rounded-3xl border border-emerald-700/50 hover:bg-emerald-800 transition-colors"
                            >
                                <div className="flex items-center gap-2 mb-4 text-emerald-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-emerald-900 opacity-50'}`} />
                                    ))}
                                </div>
                                <p className="text-emerald-50 italic mb-6 leading-relaxed">"{review.comment}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-emerald-200">
                                        {review.customerName.charAt(0)}
                                    </div>
                                    <span className="font-bold text-white">{review.customerName}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-emerald-800/30 rounded-3xl mb-12 border border-emerald-700/30">
                        <MessageSquare className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                        <p className="text-emerald-200">No reviews yet. Be the first to share your experience!</p>
                    </div>
                )}

                <div className="text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-900/50 transition-all active:scale-95 inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Write a Review
                    </button>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={handleCloseModal}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
                        >
                            {!isSubmitted ? (
                                <>
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
                                        <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <X className="w-6 h-6 text-gray-400" />
                                        </button>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. John Doe"
                                                className="w-full h-14 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 focus:border-emerald-500 focus:bg-white transition-all outline-none text-gray-900"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Rating</label>
                                            <div className="flex justify-between bg-gray-50 rounded-2xl p-2 border-2 border-gray-100">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, rating: star })}
                                                        className="p-2 hover:bg-white rounded-xl transition-all"
                                                    >
                                                        <Star className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Your Review</label>
                                            <textarea
                                                value={formData.comment}
                                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                                placeholder="Tell us about your trip..."
                                                className="w-full h-32 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 py-4 focus:border-emerald-500 focus:bg-white transition-all outline-none resize-none text-gray-900"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all active:scale-95 disabled:opacity-70 disabled:scale-100"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                    <p className="text-gray-500 max-w-xs mx-auto mb-8">
                                        Your review has been submitted for approval. It will appear on the site once verified.
                                    </p>
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-xl font-bold transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
