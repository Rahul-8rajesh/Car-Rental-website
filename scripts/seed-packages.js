const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tourPackages = [
    {
        title: "Munnar Trip - 3 Days",
        description: "Explore the misty hills of Munnar, tea gardens, and waterfalls. Includes sightseeing and comfortable transfers.",
        price: "From ₹8,500",
        duration: "3 Days / 2 Nights",
        location: "Munnar, Kerala",
        features: ["Tea Garden Visit", "Eravikulam National Park", "Mattupetty Dam"],
        image: "https://images.unsplash.com/photo-1590623190184-37053e155986?auto=format&fit=crop&q=80&w=2600" // Added a placeholder image if missing in original code, but original had none? original code had NO image in the array!
    },
    {
        title: "Sabarimala Special Package",
        description: "Conducted pilgrimage trips with experienced drivers. Safe and comfortable journey for devotees.",
        price: "From ₹12,000",
        duration: "Flexible",
        location: "Pamba / Nilakkal",
        features: ["Experienced Drivers", "Multi-point pickups", "Well-maintained vehicles"],
        image: "https://images.unsplash.com/photo-1629215089334-a14a60a77517?auto=format&fit=crop&q=80&w=2600"
    },
    {
        title: "Airport Transfer - Kochi",
        description: "Reliable 24/7 airport pickup and drop services. Punctual and professional drivers.",
        price: "From ₹1,200",
        duration: "Point-to-Point",
        location: "Kochi Airport (COK)",
        features: ["24/7 Service", "Flight Monitoring", "No Hidden Charges"],
        image: "https://images.unsplash.com/photo-1436491865332-7a61a1042792?auto=format&fit=crop&q=80&w=2600"
    },
    {
        title: "Wayanad Exploration",
        description: "Discover the wilderness of Wayanad. Visit Edakkal Caves, Banasura Sagar Dam, and more.",
        price: "From ₹10,500",
        duration: "4 Days / 3 Nights",
        location: "Wayanad, Kerala",
        features: ["Trekking", "Caves Visit", "Wildlife Sanctuary"],
        image: "https://images.unsplash.com/photo-1593181628399-3c3a962f5564?auto=format&fit=crop&q=80&w=2600"
    },
    {
        title: "Thekkady - Wildlife & Boating",
        description: "Experience the Periyar National Park, spice plantations, and elephant rides.",
        price: "From ₹9,000",
        duration: "2 Days / 1 Night",
        location: "Thekkady, Kerala",
        features: ["Lake Boating", "Elephant Safari", "Spice Garden Tour"],
        image: "https://images.unsplash.com/photo-1570701049242-b0e5d488c930?auto=format&fit=crop&q=80&w=2600"
    },
    {
        title: "Kumarakom Houseboat Stay",
        description: "Authentic Kuttanad experience with a stay in a luxury houseboat on the backwaters.",
        price: "From ₹15,000",
        duration: "2 Days / 1 Night",
        location: "Kumarakom, Kerala",
        features: ["Luxury Houseboat", "Traditional Meals", "Backwater Cruise"],
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666c74?auto=format&fit=crop&q=80&w=2600"
    }
];

async function main() {
    console.log('Start seeding packages...');

    // Clear existing packages to avoid duplicates
    await prisma.tourPackage.deleteMany({});

    for (const pkg of tourPackages) {
        const result = await prisma.tourPackage.create({
            data: pkg,
        });
        console.log(`Created package: ${result.title}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
