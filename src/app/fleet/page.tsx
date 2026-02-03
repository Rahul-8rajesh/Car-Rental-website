import { PrismaClient } from "@prisma/client";
import FleetPageContent from "@/components/FleetPageContent";

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

async function getCars() {
    return await prisma.car.findMany({
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    });
}

export default async function FleetPage() {
    const cars = await getCars();
    return <FleetPageContent cars={cars} />;
}
