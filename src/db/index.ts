import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Check for env variable
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create postgres client
const client = postgres(databaseUrl, { prepare: false });

// Initialize drizzle with postgres-js client and schema
export const db = drizzle(client, { schema });

