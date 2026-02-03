const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fleetData = [
    {
        name: "Maruti Suzuki Swift",
        image: "https://www.evmwheels.com/assets/images/cars/swift-manual.png", // Using placeholder or generic URLs if local isn't served statically yet, but user had local. I will stick to what user had but need to ensure images work. I will use the path user had.
        seats: 5,
        rate: "₹18/km",
        transmission: "Manual",
        isAvailable: true,
        category: { connectOrCreate: { where: { id: 'hatchback' }, create: { id: 'hatchback', name: 'Hatchback' } } }
    },
    {
        name: "Maruti Suzuki Swift Auto",
        image: "/cars/swift-white.png",
        seats: 5,
        rate: "₹20/km",
        transmission: "Automatic",
        isAvailable: true,
        category: { connectOrCreate: { where: { id: 'hatchback' }, create: { id: 'hatchback', name: 'Hatchback' } } }
    },
    {
        name: "Toyota Innova",
        image: "/cars/innova.png",
        seats: 7,
        rate: "₹22/km",
        transmission: "Manual",
        isAvailable: true,
        category: { connectOrCreate: { where: { id: 'suv' }, create: { id: 'suv', name: 'SUV' } } }
    },
    {
        name: "Toyota Innova Crysta",
        image: "/cars/crysta.png",
        seats: 7,
        rate: "₹26/km",
        transmission: "Manual",
        isAvailable: true,
        category: { connectOrCreate: { where: { id: 'premium' }, create: { id: 'premium', name: 'Premium' } } }
    },
    {
        name: "Force Traveller",
        image: "/cars/traveller.png",
        seats: 17,
        rate: "₹30/km",
        transmission: "Manual",
        isAvailable: true,
        category: { connectOrCreate: { where: { id: 'van' }, create: { id: 'van', name: 'Van' } } }
    },
    {
        name: "Intra Pickup",
        image: "/cars/pickup.png",
        seats: 2,
        rate: "Call for Quote",
        transmission: "Manual",
        isAvailable: true,
        category: { connectOrCreate: { where: { id: 'utility' }, create: { id: 'utility', name: 'Utility' } } }
    }
];

async function main() {
    console.log('Start seeding cars...');
    // Clear existing (optional, but good for cleanliness)
    await prisma.car.deleteMany({});

    // We need to handle categories carefully or just create them on the fly
    // Note: Schema has Category model.

    for (const car of fleetData) {
        const { category, ...carData } = car;
        // In seed, images might need to be full URLs if using external, or local paths.
        // I'll keep local paths as defined in original file.

        await prisma.car.create({
            data: {
                ...carData,
                category: category // Prisma create shorthand
            }
        });
        console.log(`Created car: ${car.name}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
