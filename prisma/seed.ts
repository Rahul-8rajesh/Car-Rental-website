import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create categories
    const cars = await prisma.category.upsert({
        where: { slug: 'cars' },
        update: {},
        create: {
            name: 'Cars',
            slug: 'cars',
            description: 'Comfortable cars for your daily needs',
            icon: '🚗',
            subTypes: ['SUV', 'Sedan', 'Hatchback', 'Electric'],
        },
    });

    const pickup = await prisma.category.upsert({
        where: { slug: 'pickup' },
        update: {},
        create: {
            name: 'Pickup',
            slug: 'pickup',
            description: 'Pickup trucks for cargo and transport',
            icon: '🛻',
            subTypes: ['Standard', 'Heavy Duty'],
        },
    });

    const travels = await prisma.category.upsert({
        where: { slug: 'travels' },
        update: {},
        create: {
            name: 'Travels',
            slug: 'travels',
            description: 'Buses and travellers for group journeys',
            icon: '🚌',
            subTypes: ['Mini Bus', 'Traveller', 'Luxury Coach'],
        },
    });

    // Create site content
    await prisma.siteContent.upsert({
        where: { key: 'contact_phone' },
        update: {},
        create: {
            key: 'contact_phone',
            value: '+919562244888',
            label: 'Contact Phone Number',
        },
    });

    await prisma.siteContent.upsert({
        where: { key: 'contact_whatsapp' },
        update: {},
        create: {
            key: 'contact_whatsapp',
            value: '919562244888',
            label: 'WhatsApp Number',
        },
    });

    await prisma.siteContent.upsert({
        where: { key: 'about_us' },
        update: {},
        create: {
            key: 'about_us',
            value: 'Welcome to Shijin P.S Cars Online - your trusted partner for car rentals in Kerala. We offer a wide range of vehicles for all your travel needs.',
            label: 'About Us Content',
        },
    });

    await prisma.siteContent.upsert({
        where: { key: 'services' },
        update: {},
        create: {
            key: 'services',
            value: 'We provide airport transfers, tour packages, wedding car rentals, and pilgrimage packages across Kerala.',
            label: 'Services Description',
        },
    });

    console.log('✅ Database seeded successfully!');
    console.log('Categories created:', { cars: cars.id, pickup: pickup.id, travels: travels.id });
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
