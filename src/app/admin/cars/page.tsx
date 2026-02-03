'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Car as CarIcon, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Car {
    id: string; // Changed to string (CUID)
    name: string;
    model?: string;
    rate: string;
    image: string;
    seats?: number;
    transmission?: string;
    categoryId?: string;
    category?: {
        name: string;
    };
}

interface Category {
    id: string;
    name: string;
}

export default function ManageCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit Mode State
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        model: '',
        rate: '',
        seats: '',
        transmission: 'Manual',
        categoryId: '',
        image: '',
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        fetchCars();
        fetchCategories();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch('/api/cars');
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

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
        setEditingCar(null);
        setFormData({
            name: '',
            model: '',
            rate: '',
            seats: '',
            transmission: 'Manual',
            categoryId: '',
            image: '',
        });
        setImagePreview(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (car: Car) => {
        setEditingCar(car);
        setFormData({
            name: car.name,
            model: car.model || '',
            rate: car.rate,
            seats: car.seats ? car.seats.toString() : '',
            transmission: car.transmission || 'Manual',
            categoryId: car.categoryId || '',
            image: car.image || '',
        });
        setImagePreview(car.image);
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            seats: formData.seats ? parseInt(formData.seats) : null,
            categoryId: formData.categoryId || null, // Ensure string or null
        };

        try {
            let response;
            if (editingCar) {
                // Update
                response = await fetch(`/api/cars/${editingCar.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                // Create
                response = await fetch('/api/cars', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            if (response.ok) {
                setIsFormOpen(false);
                fetchCars();
            } else {
                alert('Failed to save vehicle');
            }
        } catch (error) {
            console.error('Error saving car:', error);
            alert('An error occurred');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return;

        try {
            const res = await fetch(`/api/cars/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchCars();
            } else {
                alert('Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    if (loading) {
        return <div className="p-8">Loading vehicles...</div>;
    }

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Vehicles</h1>
                    <p className="text-gray-500">Add, edit, or remove vehicles from your fleet.</p>
                </div>
                <Button onClick={handleOpenAdd} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Vehicle
                </Button>
            </div>

            {/* Vehicle List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200 relative">
                            <img
                                src={car.image || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2600"}
                                alt={car.name}
                                className="w-full h-full object-cover"
                            />
                            {car.transmission && (
                                <span className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {car.transmission}
                                </span>
                            )}
                        </div>
                        <CardContent className="p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{car.name}</h3>
                                <div className="flex justify-between items-center mt-1">
                                    {car.category && (
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-medium border border-gray-200">
                                            {car.category.name}
                                        </span>
                                    )}
                                    {car.seats && <span className="text-xs text-gray-500 font-medium">{car.seats} Seats</span>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <p className="text-xl font-bold text-emerald-600">{car.rate}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => handleOpenEdit(car)}
                                    className="w-full border-2 hover:bg-gray-50"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(car.id)}
                                    className="w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {cars.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-4 border-dashed border-gray-100 mt-8">
                    <CarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg text-gray-500">No vehicles found. Add one to get started.</p>
                </div>
            )}

            {/* Modal Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}
                            </h2>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-colors"
                                    placeholder="e.g., Toyota Innova Crysta"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Model (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.model}
                                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-colors"
                                    placeholder="e.g., 2024 GX"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Rate (₹/km) *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.rate}
                                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-colors"
                                    placeholder="e.g., ₹26"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Seats</label>
                                <input
                                    type="number"
                                    value={formData.seats}
                                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-colors"
                                    placeholder="e.g., 7"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Transmission</label>
                                <select
                                    value={formData.transmission}
                                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-colors bg-white"
                                >
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-emerald-500 outline-none transition-colors bg-white"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Photo</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="h-40 mx-auto object-cover rounded-lg" />
                                    ) : (
                                        <div className="py-8 text-gray-400">
                                            <Upload className="w-8 h-8 mx-auto mb-2" />
                                            <span>Click to upload image</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2 mt-4">
                                <Button type="submit" className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700">
                                    {editingCar ? 'Update Vehicle' : 'Add Vehicle'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
