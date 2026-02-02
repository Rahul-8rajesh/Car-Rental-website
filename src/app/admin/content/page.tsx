'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SiteContent {
    id: number;
    key: string;
    value: string;
    label: string;
}

export default function AdminContentPage() {
    const [content, setContent] = useState<SiteContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('/api/site-content');
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: SiteContent) => {
        setEditingKey(item.key);
        setEditValue(item.value);
    };

    const handleSave = async (key: string, label: string) => {
        try {
            await fetch('/api/site-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value: editValue, label }),
            });
            setEditingKey(null);
            fetchContent();
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    if (loading) {
        return <div className="p-8">Loading content...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Site Content Management</h1>
            <p className="text-gray-600 mb-8">
                Edit the content that appears on your website. Changes will be reflected immediately.
            </p>

            <div className="grid gap-4">
                {content.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle className="text-lg">{item.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {editingKey === item.key ? (
                                <div className="space-y-4">
                                    <textarea
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg min-h-[100px]"
                                        placeholder={item.label}
                                    />
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleSave(item.key, item.label)}>
                                            Save
                                        </Button>
                                        <Button variant="outline" onClick={() => setEditingKey(null)}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-gray-700 mb-4 whitespace-pre-wrap">{item.value}</p>
                                    <Button onClick={() => handleEdit(item)}>Edit</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
