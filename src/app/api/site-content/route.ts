import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const key = searchParams.get('key');

        if (key) {
            const content = await prisma.siteContent.findUnique({
                where: { key },
            });
            return NextResponse.json(content);
        }

        const allContent = await prisma.siteContent.findMany();
        return NextResponse.json(allContent);
    } catch (error) {
        console.error('Error fetching site content:', error);
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const content = await prisma.siteContent.upsert({
            where: { key: body.key },
            update: { value: body.value, label: body.label },
            create: {
                key: body.key,
                value: body.value,
                label: body.label,
            },
        });
        return NextResponse.json(content);
    } catch (error) {
        console.error('Error saving site content:', error);
        return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
}
