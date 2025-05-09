import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // 👈 explicitly tell it to load the file

import type { Config } from "drizzle-kit";

export default {
    schema: "./src/database/schema.ts",   // update if you moved schema
    out: "./drizzle",                     // where to save migrations
    dialect: "postgresql",                // REQUIRED for v0.20+
    dbCredentials: {
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!, 10),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
        ssl: { rejectUnauthorized: false },
    },
} satisfies Config;
