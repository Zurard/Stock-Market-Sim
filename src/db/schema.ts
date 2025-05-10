import { 
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

/**
 * Users table (linked to Clerk/Supabase Auth user_id)
 */
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user_id
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * Stocks master table — only static info
 */
export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),         // e.g. AAPL, TSLA
  companyName: text("company_name").notNull(),
});

/**
 * User portfolio — which stocks a user owns
 */
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  stockId: integer("stock_id").references(() => stocks.id).notNull(),
  quantity: integer("quantity").notNull(),
  averageBuyPrice: numeric("average_buy_price").notNull(),
});

/**
 * Transactions table — each buy/sell made by users
 */
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  stockId: integer("stock_id").references(() => stocks.id).notNull(),
  type: text("type").notNull(), // 'buy' | 'sell'
  quantity: integer("quantity").notNull(),
  pricePerUnit: numeric("price_per_unit").notNull(),
  totalAmount: numeric("total_amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
