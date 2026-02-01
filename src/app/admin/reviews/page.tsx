"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Star, User, MessageSquare, X, Upload } from "lucide-react";

interface CustomerReview {
    id: number;
    name: string;
    rating: number;
    comment: string;
    photo: string;
}

export default function ManageReviewsPage() {
    const [reviews, setReviews] = useState<CustomerReview[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        rating: 5,
        comment: "",
        photo: ""
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const savedReviews = localStorage.getItem("customer-reviews");
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
    }, []);

    // Save to localStorage when reviews state changes
    useEffect(() => {
        if (reviews.length > 0) {
            localStorage.setItem("customer-reviews", JSON.stringify(reviews));
        }
    }, [reviews]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData({ ...formData, photo: base64String });
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenAdd = () => {
        setFormData({ name: "", rating: 5, comment: "", photo: "" });
        setImagePreview(null);
        setIsFormOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.comment) return;

        const newReview: CustomerReview = {
            ...formData,
            id: Date.now(),
        };

        setReviews([newReview, ...reviews]);
        setIsFormOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this review?")) {
            const updated = reviews.filter(r => r.id !== id);
            setReviews(updated);
            localStorage.setItem("customer-reviews", JSON.stringify(updated));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Navigation Bar */}
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

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div className="w-full">
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Manage Reviews</h1>
                        <p className="text-gray-500 font-medium">Handle customer testimonials and manage your online reputation.</p>
                    </div>
                    <button
                        onClick={handleOpenAdd}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl font-bold text-xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Plus className="w-6 h-6" />
                        Add New Review
                    </button>
                </div>

                {/* Reviews List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all group flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-50 flex-shrink-0 border-2 border-white shadow-md">
                                        {review.photo ? (
                                            <img src={review.photo} alt={review.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-blue-300">
                                                <User className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{review.name}</h3>
                                        <div className="flex text-yellow-400 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex-grow">
                                <p className="text-gray-600 italic leading-relaxed text-lg">
                                    "{review.comment}"
                                </p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Added manually</span>
                            </div>
                        </div>
                    ))}
                </div>

                {reviews.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                        <MessageSquare className="w-20 h-20 text-gray-200 mx-auto mb-4" />
                        <p className="text-2xl font-bold text-gray-400">No reviews added yet.</p>
                    </div>
                )}
            </div>

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
                    <div className="relative bg-white w-full max-w-2xl rounded-[3rem] p-10 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900">Add Customer Review</h2>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-8 h-8 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-md font-bold text-gray-700 ml-1">Customer Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Rahul Sharma"
                                        className="w-full h-16 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
                                        required
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-md font-bold text-gray-700 ml-1">Rating (1-5 Stars)</label>
                                    <div className="flex items-center justify-around h-16 bg-gray-50 rounded-2xl px-4 border-2 border-gray-100">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                className="p-1"
                                            >
                                                <Star className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 ml-1">Customer Photo (Optional)</label>
                                <div className="flex items-center gap-6">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0">
                                        {imagePreview ? (
                                            <img src={imagePreview} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="text-gray-300 w-8 h-8" />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium leading-tight">
                                        Tap circle to upload customer photo.<br />
                                        <span className="text-blue-600 font-bold">Standard format recommended.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 ml-1">Comment</label>
                                <textarea
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    placeholder="What did the customer say about your service?"
                                    className="w-full h-32 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 py-4 focus:border-blue-500 focus:bg-white transition-all outline-none resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white h-16 rounded-2xl font-bold text-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                            >
                                Add Testimonial
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
