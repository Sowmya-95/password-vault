"use client";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import ViewCredentialModal from "@/components/custom/ViewCredentialModal";
import { useEffect, useState } from "react";
import type { Credential } from "@/types";


export default function CategoryViewPage() {
    const params = useParams();
    const categoryType = (params.type as string).toLowerCase();
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCredentials = async () => {
            const res = await fetch(`/api/credentials?category=${categoryType}`);
            const data = await res.json();
            setCredentials(data);
        };
        fetchCredentials();
    }, [categoryType]);

    const filtered = credentials.filter((cred) =>
        (cred.website || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold capitalize">📂 {categoryType}</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((cred) => (
                    <Card key={cred.id} className="p-4 bg-white shadow-md hover:shadow-lg transition-all">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">{cred.website}</h3>
                            <span className="text-xs text-gray-500">{cred.category}</span>
                        </div>
                        <p className="text-sm text-gray-600">{cred.username}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-gray-400">Added: {cred.createdAt?.slice(0, 10)}</span>
                            <ViewCredentialModal
                                website={cred.website}
                                username={cred.username}
                                passwordEnc={cred.passwordEnc}
                                category={cred.category}
                                metadata={cred.metadata}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}