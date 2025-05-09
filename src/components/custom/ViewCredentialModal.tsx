"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { useState } from "react";
import { decrypt } from "@/lib/encryption";
import { Button } from "@/components/ui/button";

type Props = {
    website?: string;
    username?: string;
    passwordEnc?: string | null;
    category: string;
    metadata?: any;
};

export default function ViewCredentialModal({
    website,
    username,
    passwordEnc,
    category,
    metadata,
}: Props) {
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const decrypted = passwordEnc ? decrypt(passwordEnc) : "";

    const handleCopy = () => {
        navigator.clipboard.writeText(decrypted);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold capitalize">
                        {category === "logins"
                            ? website || "Login Details"
                            : metadata?.title || category}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4 text-sm text-gray-800">
                    {/* 🔐 Logins */}
                    {category === "logins" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Username</label>
                                <div className="p-2 bg-gray-100 rounded">{username || "—"}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600">Password</label>
                                <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
                                    <span className="font-mono text-sm break-all">
                                        {visible ? decrypted : "••••••••••••"}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => setVisible(!visible)}
                                        >
                                            {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={handleCopy}>
                                            {copied ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* 💳 Cards */}
                    {category === "cards" && (
                        <>
                            <div>Cardholder: {metadata?.cardholder ? decrypt(metadata.cardholder) : "—"}</div>
                            <div>Card Number: {metadata?.cardNumber ? decrypt(metadata.cardNumber) : "—"}</div>
                            <div>Expiry: {metadata?.expiry ? decrypt(metadata.expiry) : "—"}</div>
                            <div>CVV: {metadata?.cvv ? decrypt(metadata.cvv) : "—"}</div>
                        </>
                    )}

                    {/* 📝 Notes */}
                    {category === "notes" && (
                        <>
                            <div className="whitespace-pre-wrap">
                                <strong>Note:</strong> {metadata?.note ? decrypt(metadata.note) : "—"}
                            </div>
                        </>
                    )}


                    {/* 🧍 Personal Info / 🆔 IDs */}
                    {(category === "personal" || category === "ids") && (
                        <>
                            {Object.entries(metadata || {}).map(([key, value]) => (
                                <div key={key}>
                                    <span className="font-medium capitalize">{key}:</span> {""}{typeof value === "string" ? decrypt(value) : "—"}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
