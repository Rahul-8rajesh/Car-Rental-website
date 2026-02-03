const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const carCount = await prisma.car.count();
        const packageCount = await prisma.tourPackage.count();
        console.log(`Connection Successful!`);
        console.log(`Cars: ${carCount}`);
        console.log(`Packages: ${packageCount}`);
    } catch (e) {
        console.error("Connection Failed:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
