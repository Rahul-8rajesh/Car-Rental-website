import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();

        // categoryId might need parsing if sent as string
        const updateData: any = { ...body };
        if (body.categoryId) updateData.categoryId = String(body.categoryId); // schema id is String (CUID) or Int? Schema says String @default(cuid()) for Category.
        // Wait, schema says Car.categoryId is String?

        const car = await prisma.car.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(car);
    } catch (error) {
        console.error('Error updating car:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.car.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting car:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
