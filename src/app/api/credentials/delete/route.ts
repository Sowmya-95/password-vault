import { db } from "@/lib/db";
import { credentials } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/session";
import { z } from "zod";

export async function POST(req: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const schema = z.object({ id: z.string().uuid() });
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
        return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { id } = parsed.data;

    // Only delete credentials owned by the user
    const deleted = await db
        .delete(credentials)
        .where(and(eq(credentials.id, id), eq(credentials.userId, user.id)));

    return Response.json({ message: "Credential deleted" });
}
