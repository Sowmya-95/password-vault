import { db } from "@/lib/db";
import { credentials } from "@/database/schema";
import { getCurrentUser } from "@/lib/session";
import { z } from "zod";

export async function POST(req: Request) {
    const user = await getCurrentUser();

    if (!user) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();

    // Flexible schema
    const schema = z.object({
        category: z.string().min(1),
        metadata: z.any(),
        website: z.string().optional(),
        username: z.string().optional(),
        passwordEnc: z.string().optional(),
    });

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { website, username, passwordEnc, category, metadata } = parsed.data;

    // Extra validation for 'logins'
    if (category === "logins") {
        if (!website || !username || !passwordEnc) {
            return Response.json(
                { error: "Missing login fields" },
                { status: 400 }
            );
        }
    }

    try {
        await db.insert(credentials).values({
            website: website || null,
            username: username || null,
            passwordEnc: passwordEnc || null,
            category,
            metadata,
            userId: user.id,
        });

        return Response.json({ message: "Credential saved!" }, { status: 200 });
    } catch (err) {
        console.error("❌ Failed to save credential:", err);
        return Response.json({ error: "Failed to save credential" }, { status: 500 });
    }
}
