import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const cars = await prisma.car.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Group cars by category
        const groupedCars = cars.reduce((acc, car) => {
            if (!acc[car.category]) {
                acc[car.category] = [];
            }
            acc[car.category].push(car);
            return acc;
        }, {} as Record<string, typeof cars>);

        // Format as array of categories
        const categories = Object.keys(groupedCars).map((key, index) => ({
            id: String(index + 1), // Generate a string ID for the category
            name: key,
            slug: key.toLowerCase().replace(/\s+/g, '-'),
            cars: groupedCars[key],
        }));

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
