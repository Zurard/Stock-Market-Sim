import { seedStocks } from '@/lib/actions/seedStocks';

export async function GET() {
  await seedStocks();
  return new Response('Stocks seeded!');
}
