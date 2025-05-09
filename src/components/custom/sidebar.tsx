"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Home,
    FileText,
    User,
    CreditCard,
    Lock,
    Plus,
    LogOut
} from "lucide-react";

const links = [
    { href: "/dashboard", icon: <Home size={18} />, label: "All Passwords" },
    { href: "/dashboard/category/logins", icon: <Lock size={18} />, label: "Logins" },
    { href: "/dashboard/category/notes", icon: <FileText size={18} />, label: "Secure Notes" },
    { href: "/dashboard/category/personal", icon: <User size={18} />, label: "Personal Info" },
    { href: "/dashboard/category/cards", icon: <CreditCard size={18} />, label: "Cards" },
    { href: "/dashboard/category/ids", icon: <Lock size={18} />, label: "IDs" },
];

export function Sidebar() {
    const router = useRouter();

    const handleSignOut = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/login"); // redirect to login
    };

    return (
        <aside className="w-64 bg-gray-950 text-white p-6 border-r border-gray-800">
            <h1 className="text-xl font-bold mb-6 tracking-tight">🔐 MyVault</h1>
            <nav className="space-y-2 text-sm">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition"
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="mt-6 space-y-2">
                <Button asChild className="w-full bg-green-600 hover:bg-green-500">
                    <Link href="/dashboard/add">
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Link>
                </Button>

                {/* Sign Out Button */}
                <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full bg-lime-100 border-gray-700 text-black hover:bg-gray-800 mt-2"
                >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
            </div>
        </aside>
    );
}
