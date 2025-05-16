import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { portfolios, stocks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const ownedStocks = await db
      .select({
        symbol: stocks.symbol,
        quantity: portfolios.quantity,
      })
      .from(portfolios)
      .leftJoin(stocks, eq(portfolios.stockId, stocks.id))
      .where(eq(portfolios.userId, userId));

      console.log("Owned stocks:", ownedStocks);
    return NextResponse.json({ stocks: ownedStocks ?? [] });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch stocks' }, { status: 500 });
  }
}
