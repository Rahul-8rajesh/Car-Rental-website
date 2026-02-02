import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                car: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const booking = await prisma.booking.create({
            data: {
                customerName: body.customerName,
                customerPhone: body.customerPhone,
                pickupDate: body.pickupDate,
                pickupLocation: body.pickupLocation,
                needDriver: body.needDriver || false,
                carId: body.carId,
                vehicleType: body.vehicleType,
                notes: body.notes,
            },
        });
        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, status } = body;

        const booking = await prisma.booking.update({
            where: { id },
            data: { status },
        });
        return NextResponse.json(booking);
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}
