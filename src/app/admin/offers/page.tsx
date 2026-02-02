'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Offer {
    id: number;
    title: string;
    description?: string;
    image: string;
    isActive: boolean;
    validFrom?: string;
    validUntil?: string;
}

export default function AdminOffersPage() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await fetch('/api/offers');
            const data = await response.json();
            setOffers(data);
        } catch (error) {
            console.error('Error fetching offers:', error);
        } finally {
            setLoading(false);
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
            await fetch('/api/offers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            setFormData({ title: '', description: '', image: '' });
            setImagePreview(null);
            fetchOffers();
        } catch (error) {
            console.error('Error adding offer:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this offer?')) return;
        try {
            await fetch(`/api/offers?id=${id}`, { method: 'DELETE' });
            fetchOffers();
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    if (loading) {
        return <div className="p-8">Loading offers...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Manage Offers</h1>

            {/* Add Offer Form */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Plus className="w-5 h-5 mr-2 text-emerald-600" />
                        Add New Offer
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Offer Title *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="e.g., 20% Off on Weekend Bookings"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg min-h-[100px]"
                                placeholder="Offer details..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Banner Image *</label>
                            <input
                                type="file"
                                accept="image/*"
                                required={!formData.image}
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg" />
                            )}
                        </div>

                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                            Add Offer
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Offers List */}
            <div className="grid gap-4">
                {offers.map((offer) => (
                    <Card key={offer.id}>
                        <CardContent className="p-4">
                            <div className="flex gap-4">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                                    {offer.description && (
                                        <p className="text-gray-600 mb-2">{offer.description}</p>
                                    )}
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${offer.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {offer.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(offer.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {offers.length === 0 && (
                <Card>
                    <CardContent className="p-12 text-center text-gray-500">
                        No offers yet. Create your first promotional offer!
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
