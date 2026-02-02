'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Car as CarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Car {
    id: number;
    name: string;
    model?: string;
    rate: string;
    image: string;
    seats?: number;
    transmission?: string;
    categoryId?: number;
    category?: {
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
}

export default function ManageCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    seats: formData.seats ? parseInt(formData.seats) : null,
                    categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
                }),
            });

            if (response.ok) {
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
                fetchCars();
            }
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return;

        try {
            await fetch(`/api/cars?id=${id}`, {
                method: 'DELETE',
            });
            fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    if (loading) {
        return <div className="p-8">Loading vehicles...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Fleet</h1>
                <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold flex items-center">
                    <CarIcon className="w-5 h-5 mr-2" />
                    {cars.length} Vehicles
                </div>
            </div>

            {/* Add Vehicle Form */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                        <Plus className="w-5 h-5 mr-2 text-emerald-600" />
                        Add New Vehicle
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Vehicle Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="e.g., Toyota Innova Crysta"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Model (Optional)</label>
                            <input
                                type="text"
                                value={formData.model}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="e.g., 2024 GX"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Rate (₹/km) *</label>
                            <input
                                type="text"
                                required
                                value={formData.rate}
                                onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="e.g., ₹26"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Seats</label>
                            <input
                                type="number"
                                value={formData.seats}
                                onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="e.g., 7"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Transmission</label>
                            <select
                                value={formData.transmission}
                                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
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
                            <label className="block text-sm font-medium mb-1">Upload Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                                Add Vehicle
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Vehicle List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <Card key={car.id} className="overflow-hidden">
                        <div className="h-48 bg-gray-200 relative">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-full object-cover"
                            />
                            {car.transmission && (
                                <span className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                                    {car.transmission}
                                </span>
                            )}
                        </div>
                        <CardContent className="p-4">
                            <div className="mb-2">
                                <h3 className="text-lg font-bold">{car.name}</h3>
                                {car.model && <p className="text-sm text-gray-500">{car.model}</p>}
                                {car.category && (
                                    <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                        {car.category.name}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xl font-bold text-emerald-600">{car.rate}</p>
                                {car.seats && <p className="text-sm text-gray-600">{car.seats} Seats</p>}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(car.id)}
                                    className="flex-1"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {cars.length === 0 && (
                <Card>
                    <CardContent className="p-12 text-center text-gray-500">
                        <CarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">No vehicles in your fleet yet.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
