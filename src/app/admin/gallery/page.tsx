"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, X, Upload } from "lucide-react";

interface GalleryPhoto {
    id: number;
    image: string;
    caption: string;
}

export default function ManageGalleryPage() {
    const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const savedGallery = localStorage.getItem("trip-gallery");
        if (savedGallery) {
            setPhotos(JSON.parse(savedGallery));
        }
    }, []);

    // Save to localStorage when photos state changes
    useEffect(() => {
        if (photos.length > 0) {
            localStorage.setItem("trip-gallery", JSON.stringify(photos));
        }
    }, [photos]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImage(base64String);
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddPhoto = (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return;

        const newPhoto: GalleryPhoto = {
            id: Date.now(),
            image,
            caption
        };

        setPhotos([newPhoto, ...photos]);
        setCaption("");
        setImage("");
        setImagePreview(null);

        // Reset file input if needed
        const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const handleDeletePhoto = (id: number) => {
        if (confirm("Are you sure you want to delete this photo?")) {
            const updatedGallery = photos.filter(p => p.id !== id);
            setPhotos(updatedGallery);
            localStorage.setItem("trip-gallery", JSON.stringify(updatedGallery));
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

                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Manage Trip Gallery</h1>
                    <p className="text-gray-500 font-medium">Upload photos from past trips to showcase your travel experiences.</p>
                </div>

                {/* Upload Section */}
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Upload className="w-6 h-6 mr-2 text-blue-600" />
                        Upload New Photo
                    </h2>
                    <form onSubmit={handleAddPhoto} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-md font-bold text-gray-700 ml-1">Select Photo</label>
                                    <input
                                        id="photo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full h-16 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 py-4 focus:border-blue-500 focus:bg-white transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-md font-bold text-gray-700 ml-1">Caption (Optional)</label>
                                    <input
                                        type="text"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        placeholder="e.g. Munnar Tea Gardens"
                                        className="w-full h-16 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 overflow-hidden min-h-[200px] relative">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => { setImagePreview(null); setImage(""); }}
                                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                        <p className="font-bold text-sm">Preview</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={!image}
                            className={`w-full h-16 rounded-2xl font-bold text-xl shadow-xl transition-all active:scale-95 ${image ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-blue-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                }`}
                        >
                            Upload to Gallery
                        </button>
                    </form>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {photos.map((photo) => (
                        <div key={photo.id} className="relative aspect-square rounded-3xl overflow-hidden shadow-md group border border-gray-100">
                            <img src={photo.image} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                {photo.caption && <p className="text-white font-bold text-sm mb-4 leading-tight">{photo.caption}</p>}
                                <button
                                    onClick={() => handleDeletePhoto(photo.id)}
                                    className="bg-white/20 backdrop-blur-md hover:bg-red-600 text-white w-full h-10 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                            <button
                                onClick={() => handleDeletePhoto(photo.id)}
                                className="absolute top-4 right-4 bg-white shadow-lg text-red-600 p-2 rounded-full hover:scale-110 transition-transform md:hidden"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {photos.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                        <ImageIcon className="w-20 h-20 text-gray-200 mx-auto mb-4" />
                        <p className="text-2xl font-bold text-gray-400">No photos in the gallery yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
