import { db } from "@/lib/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { comparePasswords } from "@/lib/crypto";
import { signJwt } from "@/lib/auth";
import { z } from "zod";

export async function POST(req: Request) {
    const body = await req.json();

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(1),
    });

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
        return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
        return Response.json({ error: "Incorrect password" }, { status: 401 });
    }

    const token = signJwt({ id: user.id, email: user.email });

    return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
        headers: {
            "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`,
            "Content-Type": "application/json",
        },
    });
}
