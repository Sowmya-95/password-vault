import { db } from "@/lib/db";
import { credentials } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/session";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const user = await getCurrentUser();
    if (!user) {
        return new NextResponse("Not authenticated", { status: 401 });
    }

    try {
        let query = db.select().from(credentials).where(eq(credentials.userId, user.id)); // <-- filter by user

        if (category) {
            query = db.select().from(credentials).where(
                and(
                    eq(credentials.userId, user.id),
                    eq(credentials.category, category)
                )
            );
        }

        const data = await query;
        return NextResponse.json(data);
    } catch (error) {
        console.error("❌ Error fetching credentials:", error);
        return new NextResponse("Server error", { status: 500 });
    }
}


