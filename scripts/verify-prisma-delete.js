const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Testing Prisma Delete...');

    // 1. Create a dummy package
    const pkg = await prisma.tourPackage.create({
        data: {
            title: 'Delete Test Package',
            description: 'To be deleted',
            price: '0',
            duration: '0',
            location: 'Test',
            features: [],
            image: ''
        }
    });
    console.log('Created package:', pkg.id);

    // 2. Delete it
    console.log('Deleting package...');
    await prisma.tourPackage.delete({
        where: { id: pkg.id }
    });
    console.log('Deleted package successfully via Prisma.');

    // 3. Verify it's gone
    const check = await prisma.tourPackage.findUnique({
        where: { id: pkg.id }
    });

    if (!check) {
        console.log('Verification successful: Package not found.');
    } else {
        console.error('Verification failed: Package still exists.');
        process.exit(1);
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
