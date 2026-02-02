import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const cars = await prisma.car.findMany({
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const car = await prisma.car.create({
            data: {
                name: body.name,
                model: body.model,
                rate: body.rate,
                image: body.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2600',
                seats: body.seats,
                transmission: body.transmission,
                categoryId: body.categoryId,
                featured: body.featured || false,
            },
        });
        return NextResponse.json(car, { status: 201 });
    } catch (error) {
        console.error('Error creating car:', error);
        return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Car ID required' }, { status: 400 });
        }

        await prisma.car.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting car:', error);
        return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
    }
}
