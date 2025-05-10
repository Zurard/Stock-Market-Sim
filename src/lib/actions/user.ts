'use server';

// Adjust the import to match the actual export from "@/db"
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function addUser(email: string, userId: string, created_at: Date) {
  // Check if the user already exists in the database
  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  // Add a new user to the database
  const newUser = await db.insert(users).values({ email, id: userId, createdAt: created_at }).returning();
  return newUser[0];
}