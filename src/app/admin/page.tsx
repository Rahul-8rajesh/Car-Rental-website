"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate a small delay for the 'Logging in...' state
        setTimeout(() => {
            if (username === "admin" && password === "admin123") {
                router.push("/admin/dashboard");
            } else {
                alert("Invalid Username or Password");
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border border-gray-200 shadow-2xl rounded-2xl bg-white overflow-hidden">
                    <CardHeader className="bg-blue-900 text-white p-8 text-center">
                        <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                        <CardDescription className="text-blue-100 mt-2">
                            Enter your credentials to access the dashboard
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-bold text-gray-700">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="pl-10 py-6 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 bg-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-bold text-gray-700">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 py-6 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 bg-white"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-6 rounded-xl font-bold text-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                        <p className="text-gray-500 text-sm mx-auto">
                            © 2026 Kerala Travels Admin Portal
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
