import { db } from "@/lib/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/crypto";
import { z } from "zod";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: Request) {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
        return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
        return Response.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashed = await hashPassword(password);

    try {
        await db.insert(users).values({ email, password: hashed });
        return Response.json({ message: "User created!" });
    } catch (err) {
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
