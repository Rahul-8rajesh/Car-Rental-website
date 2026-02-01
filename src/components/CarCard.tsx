import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings, Thermometer, Briefcase } from "lucide-react";

interface CarCardProps {
    name: string;
    image: string;
    seats: number;
    rate: string;
    transmission?: string;
    ac?: boolean;
    luggage?: number;
}

export default function CarCard({ name, image, seats, rate, transmission, ac, luggage }: CarCardProps) {
    // ⚠️ IMPORTANT: Replace this placeholder number with your actual WhatsApp business number
    // Format: 91XXXXXXXXXX (country code + 10 digit number without any spaces or special characters)
    const WHATSAPP_NUMBER = "919562244888"; // 👈 Change this to your real number

    const whatsappMessage = encodeURIComponent(`Hi, I am interested in booking ${name}. Is it available?`);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    return (
        <Card className="group overflow-hidden border-border/50 bg-card hover:border-primary/50 card-hover h-full flex flex-col">
            <div className="relative h-56 w-full bg-secondary/5 overflow-hidden">
                <Image
                    src={image || "/placeholder-car.png"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardHeader className="p-6 pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{name}</CardTitle>
                </div>
                <p className="text-2xl font-bold text-primary">{rate} <span className="text-sm font-normal text-muted-foreground">/ km</span></p>
            </CardHeader>
            <CardContent className="p-6 pt-2 flex-grow">
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/5">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{seats} Seats</span>
                    </div>
                    {transmission && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/5">
                            <Settings className="h-4 w-4 text-primary" />
                            <span>{transmission}</span>
                        </div>
                    )}
                    {ac !== undefined && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/5">
                            <Thermometer className="h-4 w-4 text-primary" />
                            <span>{ac ? "AC" : "Non-AC"}</span>
                        </div>
                    )}
                    {luggage !== undefined && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/5">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <span>{luggage} Bags</span>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full bg-primary hover:bg-primary-600 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-full">
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        Book Now
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
