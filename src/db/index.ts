import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

async function main() {
    // Disable prefetch as it is not supported for "Transaction" pool mode 
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('DATABASE_URL environment variable is not set');
    }
    const client = postgres(databaseUrl, { prepare: false })
    const db = drizzle({ client });
}

main();
