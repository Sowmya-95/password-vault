"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function DynamicCategoryFields({ category, form, setForm }: any) {
    const update = (field: string, value: string) =>
        setForm({ ...form, [field]: value });

    if (category === "cards") {
        return (
            <>
                <Label>Cardholder</Label>
                <Input value={form.cardholder || ""} onChange={(e) => update("cardholder", e.target.value)} />

                <Label>Card Number</Label>
                <Input value={form.cardNumber || ""} onChange={(e) => update("cardNumber", e.target.value)} />

                <Label>Expiry Date</Label>
                <Input type="month" value={form.expiry || ""} onChange={(e) => update("expiry", e.target.value)} />

                <Label>CVV</Label>
                <Input type="password" value={form.cvv || ""} onChange={(e) => update("cvv", e.target.value)} />
            </>
        );
    }

    if (category === "notes") {
        return (
            <>
                <Label>Title</Label>
                <Input value={form.title || ""} onChange={(e) => update("title", e.target.value)} />

                <Label>Note</Label>
                <Textarea value={form.note || ""} onChange={(e) => update("note", e.target.value)} />
            </>
        );
    }

    if (category === "personal") {
        return (
            <>
                <Label>Full Name</Label>
                <Input value={form.fullName || ""} onChange={(e) => update("fullName", e.target.value)} />

                <Label>Email</Label>
                <Input value={form.email || ""} onChange={(e) => update("email", e.target.value)} />

                <Label>Date of Birth</Label>
                <Input type="date" value={form.dob || ""} onChange={(e) => update("dob", e.target.value)} />
            </>
        );
    }

    if (category === "ids") {
        return (
            <>
                <Label>ID Type</Label>
                <Input value={form.idType || ""} onChange={(e) => update("idType", e.target.value)} />

                <Label>ID Number</Label>
                <Input value={form.idNumber || ""} onChange={(e) => update("idNumber", e.target.value)} />

                <Label>Issued Date</Label>
                <Input type="date" value={form.issued || ""} onChange={(e) => update("issued", e.target.value)} />

                <Label>Expiry Date</Label>
                <Input type="date" value={form.expiry || ""} onChange={(e) => update("expiry", e.target.value)} />
            </>
        );
    }

    return null;
}
