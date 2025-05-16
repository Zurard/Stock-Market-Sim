"use server";

import { db } from "@/db/index";
import { portfolios, stocks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserOwnedStockSymbols(userId: string) {
  const result = await db
    .select({
      symbol: stocks.symbol,
    })
    .from(portfolios)
    .innerJoin(stocks, eq(portfolios.stockId, stocks.id))
    .where(eq(portfolios.userId, userId));

  console.log("User owned stocks:", result);

  return result.map((row) => row.symbol);
}
