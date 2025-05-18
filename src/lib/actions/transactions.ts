"use server";

import { db } from "../../db/index";
import { portfolios, transactions, stocks } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function buyStock({
  userId,
  stockSymbol,
  quantityToBuy,
  pricePerUnit,
}: {
  userId: string;
  stockSymbol: string;
  quantityToBuy: number;
  pricePerUnit: number;
}) {
  const totalAmount = pricePerUnit * quantityToBuy;

const stock = await db.query.stocks.findFirst({
  where: eq(stocks.symbol, stockSymbol),
});

if (!stock) {
  throw new Error("Stock not found");
}

const stockId = stock.id;

  const existingPortfolio = await db
    .select()
    .from(portfolios)
    .where(and(eq(portfolios.userId, userId), eq(portfolios.stockId, stockId)))
    .then((rows) => rows[0]);

  if (existingPortfolio) {
    const newQuantity = existingPortfolio.quantity + quantityToBuy;
    const avgBuyPrice = Number(existingPortfolio.averageBuyPrice);
    const newAvgBuyPrice =
      (avgBuyPrice * existingPortfolio.quantity +
        pricePerUnit * quantityToBuy) /
      newQuantity;

    await db
      .update(portfolios)
      .set({
        quantity: newQuantity,
        averageBuyPrice:String(newAvgBuyPrice),
      })
      .where(eq(portfolios.id, existingPortfolio.id));
  } else {

    await db.insert(portfolios).values({
      userId,
      stockId,
      quantity: quantityToBuy,
      averageBuyPrice: String(pricePerUnit),
    });
  }

await db.insert(transactions).values(
    {
        
        userId,
        stockId,
        type: "buy",
        quantity: quantityToBuy,
        pricePerUnit: String(pricePerUnit),
        createdAt: new Date(),
        totalAmount: String(totalAmount),

    }
)
  return { message: "Stock purchase successful." };
}


export async function sellStock({
  userId,
  stockSymbol,
  quantityToSell,
  pricePerUnit,
}: {
  userId: string;
  stockSymbol: string;
  quantityToSell: number;
  pricePerUnit: number;
}) {
  
  const totalAmount = pricePerUnit * quantityToSell;   
  const stock = await db.query.stocks.findFirst({
  where: eq(stocks.symbol, stockSymbol),
});
  if (!stock) {
    throw new Error("Stock not found");
  }
const stockId = stock.id;

  const portfolioEntry = await db.query.portfolios.findFirst({
    where: and(eq(portfolios.userId, userId), eq(portfolios.stockId, stockId)),
  });

  if (!portfolioEntry) {
    throw new Error("You don't own this stock.");
  }

  if (portfolioEntry.quantity < quantityToSell) {
    throw new Error(`You only own ${portfolioEntry.quantity} shares.`);
  }

    if (portfolioEntry.quantity === quantityToSell) {
    await db.delete(portfolios).where(eq(portfolios.id, portfolioEntry.id));
  } else {
    await db
      .update(portfolios)
      .set({
        quantity: portfolioEntry.quantity - quantityToSell,
      })
      .where(eq(portfolios.id, portfolioEntry.id));
  }

    await db.insert(transactions).values({
    userId,
    stockId,
    type: "sell",
    quantity: quantityToSell,
    pricePerUnit: pricePerUnit.toString(),
    totalAmount: String(totalAmount),
    createdAt: new Date(),
  });

  return {
    message: "Stock sold successfully.",
    remainingQuantity:
      portfolioEntry.quantity === quantityToSell
        ? 0
        : portfolioEntry.quantity - quantityToSell,
    totalAmount,
  };

}