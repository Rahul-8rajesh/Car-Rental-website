import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import PackagesList from "@/components/PackagesList";

// Force dynamic rendering for future database integration
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

function PackagesHero() {
    return (
        <section className="relative h-[300px] flex items-center justify-center bg-emerald-900 text-white overflow-hidden">
            {/* Simple Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container relative z-10 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Packages</h1>
                <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
                    Explore the beauty of Kerala with our premium tour packages.
                </p>
            </div>
        </section>
    );
}

async function getPackages() {
    const packages = await prisma.tourPackage.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    });
    return packages;
}

export default async function PackagesPage() {
    const packages = await getPackages();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <PackagesHero />

            {/* Packages Grid */}
            <PackagesList packages={packages} />

            {/* Trust Banner */}
            <section className="container mx-auto px-4 pb-20 mt-12">
                <div className="bg-emerald-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Package?</h2>
                        <p className="text-emerald-100 mb-8 max-w-xl text-lg">
                            We can tailor-make your Kerala experience exactly how you want it. Contact us for a personalized quote.
                        </p>
                        <Button asChild size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 border-none rounded-2xl px-10 h-16 text-lg font-semibold">
                            <Link href="/contact">Talk to our Travel Experts</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}


