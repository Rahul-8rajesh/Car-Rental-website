import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const offers = await prisma.offer.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(offers);
    } catch (error) {
        console.error('Error fetching offers:', error);
        return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const offer = await prisma.offer.create({
            data: {
                title: body.title,
                description: body.description,
                image: body.image,
                validFrom: body.validFrom ? new Date(body.validFrom) : null,
                validUntil: body.validUntil ? new Date(body.validUntil) : null,
                isActive: body.isActive ?? true,
            },
        });
        return NextResponse.json(offer, { status: 201 });
    } catch (error) {
        console.error('Error creating offer:', error);
        return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Offer ID required' }, { status: 400 });
        }

        await prisma.offer.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting offer:', error);
        return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 });
    }
}
