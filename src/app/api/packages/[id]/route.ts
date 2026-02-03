import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Cast to any to avoid phantom type errors in IDE with generated client
        const updatedPackage = await (prisma as any).tourPackage.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                price: body.price,
                duration: body.duration,
                location: body.location,
                features: body.features,
                image: body.image,
            },
        });

        return NextResponse.json(updatedPackage);
    } catch (error) {
        console.error('Error updating package:', error);
        return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // Cast to any to avoid phantom type errors
        await (prisma as any).tourPackage.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Package deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting package:', error);
        // Handle "Record not found" gracefully for idempotency
        if (error.code === 'P2025') {
            return NextResponse.json({ message: 'Package not found or already deleted' }, { status: 200 });
        }
        return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
    }
}
