// "use server";

// import { db } from "../../db/index";
// import { portfolios, transactions, stocks } from "@/db/schema";
// import { eq, and } from "drizzle-orm";

// export async function buyStock({
//   userId,
//   stockSymbol,
//   quantityToBuy,
//   pricePerUnit,
// }: {
//   userId: string;
//   stockSymbol: string;
//   quantityToBuy: number;
//   pricePerUnit: number;
// }) {
//   const totalAmount = pricePerUnit * quantityToBuy;

//   const stock = await db.query.stocks.findFirst({
//     where: eq(stocks.symbol, stockSymbol),
//   });

//   if (!stock) {
//     throw new Error("Stock not found");
//   }

//   const stockId = stock.id;

//   const existingPortfolio = await db.query.portfolios.findFirst({
//     where: and(eq(portfolios.userId, userId), eq(portfolios.stockId, stockId)),
//   });

//   if (existingPortfolio) {
//     const newQuantity = existingPortfolio.quantity + quantityToBuy;
//     const newAvgBuyPrice =
//       (existingPortfolio.averageBuyPrice * existingPortfolio.quantity +
//         pricePerUnit * quantityToBuy) /
//       newQuantity;

//     await db
//       .update(portfolios)
//       .set({
//         quantity: newQuantity,
//         averageBuyPrice: newAvgBuyPrice,
//       })
//       .where(eq(portfolios.id, existingPortfolio.id));
//   } else {
//     await db.insert(portfolios).values({
//       userId,
//       stockId,
//       quantity: quantityToBuy,
//       averageBuyPrice: pricePerUnit,
//     });
//   }

//   await db.insert(transactions).values({
//     userId,
//     stockId,
//     type: "buy",
//     quantity: quantityToBuy,
//     pricePerUnit,
//     totalAmount,
//   });

//   return { message: "Stock purchase successful." };
// }
