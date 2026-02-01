import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    image?: string;
}

export default function ServiceCard({ title, description, icon: Icon, image }: ServiceCardProps) {
    return (
        <Card className="overflow-hidden bg-card border-border/50 hover:border-primary/50 card-hover h-full flex flex-col group transition-all duration-300">
            {image && (
                <div className="relative h-48 w-full bg-secondary/5 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
            )}
            <CardHeader className="p-6 pb-2">
                <div className="flex items-center gap-4 mb-3">
                    {Icon && (
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                            <Icon className="h-6 w-6" />
                        </div>
                    )}
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-grow">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    );
}
