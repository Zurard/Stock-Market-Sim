import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";

// your Supabase DB connection string from .env.local
const connectionString = process.env.DATABASE_URL as string;

if (!connectionString) {
  throw new Error("Missing SUPABASE_DB_URL env variable");
}

const client = postgres(connectionString);
export const db = drizzle(client);
