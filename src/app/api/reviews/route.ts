import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const isPublic = searchParams.get('public') === 'true';

    try {
        const where = isPublic ? { status: 'APPROVED' } : {};
        const reviews = await prisma.review.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        // For Admin: sort Pending first
        if (!isPublic) {
            reviews.sort((a, b) => {
                if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
                if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
                return 0; // Respect original orderBy for same status
            });
        }

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const review = await prisma.review.create({
            data: {
                customerName: body.customerName,
                rating: parseInt(body.rating),
                comment: body.comment,
                status: 'PENDING'
            }
        });
        return NextResponse.json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }
}
