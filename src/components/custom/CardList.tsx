"use client";
import { Card } from "@/components/ui/card";
import ViewCredentialModal from "@/components/custom/ViewCredentialModal";

import type { Credential } from "@/types";

export default function CardList({ credentials }: { credentials: Credential[] }) {
    if (credentials.length === 0) {
        return <p className="text-sm text-gray-500">No credentials found.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((cred, i) => (
                <Card key={i} className="p-4 bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{cred.website}</h3>
                        <span className="text-xs text-gray-500">{cred.category}</span>
                    </div>
                    <p className="text-sm text-gray-600">{cred.username}</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-400">
                            Added: {cred.createdAt?.slice(0, 10) || "unknown"}
                        </span>
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
    );
}
