import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const packages = await prisma.tourPackage.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(packages);
    } catch (error) {
        console.error('Error fetching packages:', error);
        return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newPackage = await prisma.tourPackage.create({
            data: {
                title: body.title,
                description: body.description,
                price: body.price,
                duration: body.duration,
                location: body.location,
                features: body.features || [],
                image: body.image,
            },
        });

        return NextResponse.json(newPackage, { status: 201 });
    } catch (error) {
        console.error('Error creating package:', error);
        return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
    }
}
