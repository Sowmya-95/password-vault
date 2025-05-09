import { cookies } from "next/headers";
import { verifyJwt } from "./auth";
import { db } from "./db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const payload = verifyJwt<{ id: string }>(token);
    if (!payload) return null;

    const [user] = await db.select().from(users).where(eq(users.id, payload.id));
    return user || null;
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.set('session', '', { path: '/', expires: new Date(0) });
}