import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                cars: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        // Format categories with slug
        const formattedCategories = categories.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.name.toLowerCase().replace(/\s+/g, '-'),
            cars: category.cars,
        }));

        return NextResponse.json(formattedCategories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
