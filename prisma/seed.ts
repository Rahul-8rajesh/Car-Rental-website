import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Cleans existing data
    await prisma.booking.deleteMany();
    await prisma.car.deleteMany();
    await prisma.category.deleteMany();
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

    // 2. Create Categories
    const carsCategory = await prisma.category.create({
        data: {
            name: 'Cars',
            description: 'Passenger cars for daily use',
        },
    });

    const pickupCategory = await prisma.category.create({
        data: {
            name: 'Pickup',
            description: 'Pickup trucks for cargo',
        },
    });

    const travelsCategory = await prisma.category.create({
        data: {
            name: 'Travels',
            description: 'Large vehicles for group travel',
        },
    });

    console.log('Created Categories');

    // 3. Create Cars

    // Category: Cars
    await prisma.car.create({
        data: {
            name: 'Innova Crysta',
            model: '2024 Model',
            categoryId: carsCategory.id,
            transmission: 'Manual',
            rate: '₹2500/day',
            seats: 7,
            image: '/images/innova.jpg', // Placeholder
            isAvailable: true,
        },
    });

    await prisma.car.create({
        data: {
            name: 'Swift Dzire',
            model: '2023 Model',
            categoryId: carsCategory.id,
            transmission: 'Manual',
            rate: '₹1500/day',
            seats: 5,
            image: '/images/swift.jpg', // Placeholder
            isAvailable: true,
        },
    });

    // Category: Pickup
    await prisma.car.create({
        data: {
            name: 'Mahindra Bolero Pickup',
            model: 'Heavy Duty',
            categoryId: pickupCategory.id,
            transmission: 'Manual',
            rate: '₹2000/day',
            seats: 3,
            image: '/images/pickup.jpg', // Placeholder
            isAvailable: true,
        },
    });

    // Category: Travels
    await prisma.car.create({
        data: {
            name: 'Force Traveller',
            model: '17 Seater',
            categoryId: travelsCategory.id,
            transmission: 'Manual',
            rate: '₹4000/day',
            seats: 17,
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
