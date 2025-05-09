import { pgTable, text, uuid, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const credentials = pgTable("credentials", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id),
    website: text("website"),
    username: text("username"),
    passwordEnc: text("password_enc"),
    category: text("category").notNull(),
    metadata: jsonb("metadata").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
