'use server';

import { db } from '@/db';
import { stocks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function seedStocks() {
  const stockList = [
    { symbol: 'AAPL', companyName: 'Apple Inc.' },
    { symbol: 'MSFT', companyName: 'Microsoft Corporation' },
    { symbol: 'TSLA', companyName: 'Tesla Inc.' },
    { symbol: 'GOOGL', companyName: 'Alphabet Inc.' },
    { symbol: 'AMZN', companyName: 'Amazon.com Inc.' },
    { symbol: 'NVDA', companyName: 'NVIDIA Corporation' },
    { symbol: 'META', companyName: 'Meta Platforms Inc.' },
    { symbol: 'NFLX', companyName: 'Netflix Inc.' },
    { symbol: 'IBM', companyName: 'International Business Machines' },
    { symbol: 'ORCL', companyName: 'Oracle Corporation' },
    { symbol: 'AMD', companyName: 'Advanced Micro Devices' },
    { symbol: 'INTC', companyName: 'Intel Corporation' },
    { symbol: 'BA', companyName: 'Boeing Company' },
    { symbol: 'JPM', companyName: 'JPMorgan Chase & Co.' },
    { symbol: 'WMT', companyName: 'Walmart Inc.' },
    { symbol: 'DIS', companyName: 'Walt Disney Company' },
    { symbol: 'PFE', companyName: 'Pfizer Inc.' },
    { symbol: 'T', companyName: 'AT&T Inc.' },
    { symbol: 'XOM', companyName: 'Exxon Mobil Corporation' },
    { symbol: 'KO', companyName: 'Coca-Cola Company' },
  ];

  for (const stock of stockList) {
    const existing = await db
      .select()
      .from(stocks)
      .where(eq(stocks.symbol, stock.symbol));

    if (existing.length === 0) {
      await db.insert(stocks).values(stock);
    }
  }

  console.log('Stocks seeded successfully!');
}
