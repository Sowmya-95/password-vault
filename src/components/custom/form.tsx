"use client";

import { useState } from "react";
import { encrypt } from "@/lib/encryption";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DynamicCategoryFields from "@/components/custom/DynamicCategoryFields";

export default function CredentialForm() {
    const [form, setForm] = useState<any>({
        website: "",
        username: "",
        password: "",
        category: "logins",
        metadata: {}, // ✅ Initialize metadata properly
    });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const encryptedPassword = form.password ? encrypt(form.password) : "";

        // Handle encrypted metadata safely
        let encryptedMetadata: any = {};

        if (form.category === "cards") {
            encryptedMetadata = {
                cardholder: encrypt(form.cardholder || ""),
                cardNumber: encrypt(form.cardNumber || ""),
                expiry: encrypt(form.expiry || ""),
                cvv: encrypt(form.cvv || ""),
            };
        } else if (form.category === "notes") {
            encryptedMetadata = {
                title: form.title || "",
                note: encrypt(form.note || ""),
            };
        } else if (form.category === "personal") {
            encryptedMetadata = {
                fullName: encrypt(form.fullName || ""),
                email: encrypt(form.email || ""),
                dob: encrypt(form.dob || ""),
            };
        } else if (form.category === "ids") {
            encryptedMetadata = {
                idType: encrypt(form.idType || ""),
                idNumber: encrypt(form.idNumber || ""),
                issued: encrypt(form.issued || ""),
                expiry: encrypt(form.expiry || ""),
            };
        }

        const payload: any = {
            category: form.category,
            metadata: encryptedMetadata,
        };

        if (form.category === "logins") {
            payload.website = form.website;
            payload.username = form.username;
            payload.passwordEnc = encryptedPassword;
        }

        const res = await fetch("/api/credentials/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("✅ Saved!");
            setForm({
                website: "",
                username: "",
                password: "",
                category: "logins",
                metadata: {},
            });
        } else {
            setMessage("❌ " + (data.error || "Failed"));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border rounded p-2"
                >
                    <option value="logins">🔐 Logins</option>
                    <option value="cards">💳 Cards</option>
                    <option value="notes">📝 Secure Notes</option>
                    <option value="personal">🧍 Personal Info</option>
                    <option value="ids">🆔 IDs</option>
                </select>
            </div>

            {form.category === "logins" && (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                            id="website"
                            placeholder="e.g. amazon.com"
                            value={form.website}
                            onChange={(e) => setForm({ ...form, website: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="your@email.com"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                </>
            )}

            {/* Show Dynamic Fields for other categories */}
            <DynamicCategoryFields category={form.category} form={form} setForm={setForm} />

            <Button type="submit" className="w-full">
                Save Credential
            </Button>
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </form>
    );
}
