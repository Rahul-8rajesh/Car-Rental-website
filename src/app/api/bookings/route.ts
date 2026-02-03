import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Force dynamic rendering to always fetch fresh bookings
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
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

        // Construct details string from optional fields
        const detailsParts = [];
        if (body.date) detailsParts.push(`Date: ${body.date}`);
        if (body.location) detailsParts.push(`Location: ${body.location}`);
        if (body.needDriver) detailsParts.push(`Driver Required: ${body.needDriver ? 'Yes' : 'No'}`);
        if (body.notes) detailsParts.push(`Notes: ${body.notes}`);

        const details = detailsParts.join(' | ');

        const booking = await prisma.booking.create({
            data: {
                customerName: body.customerName,
                phoneNumber: body.phoneNumber,
                vehicleName: body.vehicleName,
                details: details,
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
        const { id, ...data } = body;

        // Since status isn't in the schema provided by user, this might fail if we try to update status.
        // User schema for Booking: { id, customerName, phoneNumber, vehicleName, details, createdAt }
        // No status field! I should probably remove this or check schema.
        // For now I will remove PATCH or comment it out since 'status' column doesn't exist.

        return NextResponse.json({ error: 'Update not supported yet' }, { status: 501 });
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}
