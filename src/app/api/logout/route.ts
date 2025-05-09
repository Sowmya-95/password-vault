import { NextResponse } from "next/server";
import { destroySession } from "@/lib/session";
export async function POST() {
    await destroySession(); // removes cookie/session
    return NextResponse.json({ message: "Signed out" });
}
