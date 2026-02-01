"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Car as CarIcon } from "lucide-react";

interface Car {
    id: number;
    name: string;
    rate: string;
    image: string;
}

export default function ManageCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [newName, setNewName] = useState("");
    const [newRate, setNewRate] = useState("");
    const [newImage, setNewImage] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCars = localStorage.getItem("admin_cars_data");
        if (savedCars) {
            setCars(JSON.parse(savedCars));
        } else {
            // Default initial data if empty
            const initialData = [
                { id: 1, name: "Toyota Innova Crysta", rate: "26", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2600" },
                { id: 2, name: "Maruti Suzuki Swift", rate: "18", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=2600" }
            ];
            setCars(initialData);
            localStorage.setItem("admin_cars_data", JSON.stringify(initialData));
        }
    }, []);

    // Save to localStorage when cars state changes
    useEffect(() => {
        if (cars.length > 0) {
            localStorage.setItem("admin_cars_data", JSON.stringify(cars));
        }
    }, [cars]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setNewImage(base64String);
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddCar = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newRate) return;

        const newCar: Car = {
            id: Date.now(),
            name: newName,
            rate: newRate,
            image: newImage || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2600"
        };

        setCars([...cars, newCar]);
        setNewName("");
        setNewRate("");
        setNewImage("");
        setImagePreview(null);
    };

    const handleDeleteCar = (id: number) => {
        if (confirm("Are you sure you want to delete this car?")) {
            const updatedCars = cars.filter(car => car.id !== id);
            setCars(updatedCars);
            localStorage.setItem("admin_cars_data", JSON.stringify(updatedCars));
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

                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-black text-gray-900">Manage Your Fleet</h1>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold flex items-center shadow-lg">
                        <CarIcon className="w-5 h-5 mr-2" />
                        {cars.length} Vehicles
                    </div>
                </div>

                {/* Add Car Form */}
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Plus className="w-6 h-6 mr-2 text-blue-600" />
                        Add New Vehicle
                    </h2>
                    <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <label className="text-md font-bold text-gray-700 ml-1">Car Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="e.g. Toyota Innova"
                                className="w-full h-16 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
                                required
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-md font-bold text-gray-700 ml-1">Price (₹/km)</label>
                            <input
                                type="number"
                                value={newRate}
                                onChange={(e) => setNewRate(e.target.value)}
                                placeholder="e.g. 26"
                                className="w-full h-16 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
                                required
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-md font-bold text-gray-700 ml-1">Upload Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full h-16 rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 py-4 focus:border-blue-500 focus:bg-white transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            />
                        </div>
                        {imagePreview && (
                            <div className="md:col-span-3 flex items-center gap-4 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl shadow-md" />
                                <div>
                                    <p className="font-bold text-blue-900">Image Selected</p>
                                    <button
                                        type="button"
                                        onClick={() => { setImagePreview(null); setNewImage(""); }}
                                        className="text-sm text-red-600 font-bold hover:underline"
                                    >
                                        Remove Photo
                                    </button>
                                </div>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="md:col-span-3 bg-blue-700 hover:bg-blue-800 text-white h-16 rounded-2xl font-bold text-xl shadow-xl shadow-blue-200 transition-all active:scale-95 mt-4"
                        >
                            Add Vehicle to Fleet
                        </button>
                    </form>
                </div>

                {/* Car List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <div key={car.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all group">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl shadow-sm font-bold text-blue-700">
                                    ₹{car.rate}/km
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 truncate">{car.name}</h3>
                                <button
                                    onClick={() => handleDeleteCar(car.id)}
                                    className="w-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group/btn"
                                >
                                    <Trash2 className="w-5 h-5 group-hover/btn:animate-bounce" />
                                    Delete Vehicle
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {cars.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                        <CarIcon className="w-20 h-20 text-gray-200 mx-auto mb-4" />
                        <p className="text-2xl font-bold text-gray-400">No vehicles in your fleet yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
