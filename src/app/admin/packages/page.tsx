"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Package, Edit3, X, Image as ImageIcon } from "lucide-react";

interface TourPackage {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
}

export default function ManagePackagesPage() {
    const [packages, setPackages] = useState<TourPackage[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: ""
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const savedPackages = localStorage.getItem("admin_packages_data");
        if (savedPackages) {
            setPackages(JSON.parse(savedPackages));
        } else {
            // Default initial data
            const initialData = [
                { id: 1, title: "Munnar Bliss", description: "3 Days, 2 Nights in the tea gardens", price: "8500", image: "https://images.unsplash.com/photo-1590623190184-37053e155986?auto=format&fit=crop&q=80&w=2600" },
                { id: 2, title: "Wayand Wild", description: "4 Days, 3 Nights jungle stay", price: "12000", image: "https://images.unsplash.com/photo-1593181628399-3c3a962f5564?auto=format&fit=crop&q=80&w=2600" }
            ];
            setPackages(initialData);
            localStorage.setItem("admin_packages_data", JSON.stringify(initialData));
        }
    }, []);

    // Save to localStorage when packages state changes
    useEffect(() => {
        if (packages.length > 0) {
            localStorage.setItem("admin_packages_data", JSON.stringify(packages));
        }
    }, [packages]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData({ ...formData, image: base64String });
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenAdd = () => {
        setEditingPackage(null);
        setFormData({ title: "", description: "", price: "", image: "" });
        setImagePreview(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (pkg: TourPackage) => {
        setEditingPackage(pkg);
        setFormData({ title: pkg.title, description: pkg.description, price: pkg.price, image: pkg.image });
        setImagePreview(pkg.image);
        setIsFormOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.price) return;

        if (editingPackage) {
            setPackages(packages.map(p => p.id === editingPackage.id ? { ...p, ...formData } : p));
        } else {
            const newPackage: TourPackage = {
                ...formData,
                id: Date.now(),
                image: formData.image || "https://images.unsplash.com/photo-1582963458063-8a033390884a?auto=format&fit=crop&q=80&w=2600"
            };
            setPackages([...packages, newPackage]);
        }
        setIsFormOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this package?")) {
            const updated = packages.filter(p => p.id !== id);
            setPackages(updated);
            localStorage.setItem("admin_packages_data", JSON.stringify(updated));
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
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Manage Packages</h1>
                        <p className="text-gray-500 font-medium">Create and customize tour experiences for your customers.</p>
                    </div>
                    <button
                        onClick={handleOpenAdd}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl font-bold text-xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Plus className="w-6 h-6" />
                        Create New Package
                    </button>
                </div>

                {/* Package List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all group flex flex-col">
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1.5 rounded-xl shadow-lg font-bold text-lg">
                                    ₹{pkg.price}
                                </div>
                            </div>
                            <div className="p-8 flex-grow">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 truncate">{pkg.title}</h3>
                                <p className="text-gray-500 mb-8 line-clamp-2 md:line-clamp-3 leading-relaxed">
                                    {pkg.description}
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                    <button
                                        onClick={() => handleOpenEdit(pkg)}
                                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 h-16 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-lg"
                                    >
                                        <Edit3 className="w-5 h-5" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg.id)}
                                        className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white h-16 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-lg"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {packages.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                        <Package className="w-20 h-20 text-gray-200 mx-auto mb-4" />
                        <p className="text-2xl font-bold text-gray-400">No packages created yet.</p>
                    </div>
                )}
            </div>

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
                    <div className="relative bg-white w-full max-w-2xl rounded-[3rem] p-10 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900">
                                {editingPackage ? "Edit Package" : "Add New Package"}
                            </h2>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-8 h-8 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 ml-1">Package Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Munnar Trip"
                                    className="w-full h-14 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 focus:border-blue-500 focus:bg-white transition-all outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 ml-1">Description (Days/Nights, etc.)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="e.g. 3 Days, 2 Nights stay in premium resort"
                                    className="w-full h-32 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 py-4 focus:border-blue-500 focus:bg-white transition-all outline-none resize-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 ml-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="e.g. 8500"
                                        className="w-full h-14 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 focus:border-blue-500 focus:bg-white transition-all outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 ml-1">Upload Image</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full h-14 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 group-hover:border-blue-300 group-hover:bg-blue-50 transition-all overflow-hidden">
                                            {imagePreview ? (
                                                <div className="flex items-center gap-3 w-full px-4 text-left">
                                                    <img src={imagePreview} className="w-10 h-10 object-cover rounded-lg shadow-sm" />
                                                    <span className="text-sm font-bold text-blue-600 truncate">Image Selected</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-5 h-5 mr-2" />
                                                    <span className="font-bold text-sm">Select Image</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white h-16 rounded-2xl font-bold text-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                            >
                                {editingPackage ? "Update Package" : "Create Package"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
