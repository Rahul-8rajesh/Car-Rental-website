import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Cleans existing data
    await prisma.booking.deleteMany();
    await prisma.car.deleteMany();
    await prisma.siteSettings.deleteMany();

    // 1. Create Site Settings
    const settings = await prisma.siteSettings.create({
        data: {
            companyName: 'Shijin P.S Cars',
            phoneNumber: '919562244888',
            address: 'Kerala, India',
            heroTitle: 'Find Your Perfect Drive in God\'s Own Country',
        },
    });
    console.log('Created Site Settings:', settings.id);

    // 2. Create Cars (Replacing previous Categories + Cars structure)

    // Category: Cars
    await prisma.car.create({
        data: {
            name: 'Innova Crysta',
            model: '2024 Model',
            category: 'Cars',
            subCategory: 'SUV',
            transmission: 'Manual',
            price: 2500,
            image: '/images/innova.jpg', // Placeholder
            isAvailable: true,
        },
    });

    await prisma.car.create({
        data: {
            name: 'Swift Dzire',
            model: '2023 Model',
            category: 'Cars',
            subCategory: 'Sedan',
            transmission: 'Manual',
            price: 1500,
            image: '/images/swift.jpg', // Placeholder
            isAvailable: true,
        },
    });

    // Category: Pickup
    await prisma.car.create({
        data: {
            name: 'Mahindra Bolero Pickup',
            model: 'Heavy Duty',
            category: 'Pickup',
            subCategory: 'Standard',
            transmission: 'Manual',
            price: 2000,
            image: '/images/pickup.jpg', // Placeholder
            isAvailable: true,
        },
    });

    // Category: Travels
    await prisma.car.create({
        data: {
            name: 'Force Traveller',
            model: '17 Seater',
            category: 'Travels',
            subCategory: 'Traveller',
            transmission: 'Manual',
            price: 4000,
            image: '/images/traveller.jpg', // Placeholder
            isAvailable: true,
        },
    });

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
