-- CREATE TABLE "portfolios" (
-- 	"id" serial PRIMARY KEY NOT NULL,
-- 	"user_id" text NOT NULL,
-- 	"stock_id" integer NOT NULL,
-- 	"quantity" integer NOT NULL,
-- 	"average_buy_price" numeric NOT NULL
-- );
-- --> statement-breakpoint
-- CREATE TABLE "stocks" (
-- 	"id" serial PRIMARY KEY NOT NULL,
-- 	"symbol" text NOT NULL,
-- 	"company_name" text NOT NULL,
-- 	"current_price" numeric NOT NULL,
-- 	"created_at" timestamp DEFAULT now()
-- );
-- --> statement-breakpoint
-- CREATE TABLE "transactions" (
-- 	"id" serial PRIMARY KEY NOT NULL,
-- 	"user_id" text NOT NULL,
-- 	"stock_id" integer NOT NULL,
-- 	"type" text NOT NULL,
-- 	"quantity" integer NOT NULL,
-- 	"price_per_unit" numeric NOT NULL,
-- 	"total_amount" numeric NOT NULL,
-- 	"created_at" timestamp DEFAULT now()
-- );
-- --> statement-breakpoint
-- CREATE TABLE "users" (
-- 	"id" text PRIMARY KEY NOT NULL,
-- 	"email" text NOT NULL,
-- 	"created_at" timestamp DEFAULT now()
-- );
--> statement-breakpoint

-- Add foreign key constraint for "portfolios" if it doesn't already exist
DO $$ 
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'portfolios_user_id_users_id_fk') THEN
      ALTER TABLE "portfolios" 
      ADD CONSTRAINT "portfolios_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
   END IF;
END $$;
--> statement-breakpoint

-- Add foreign key constraint for "portfolios" stock_id if it doesn't already exist
DO $$ 
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'portfolios_stock_id_stocks_id_fk') THEN
      ALTER TABLE "portfolios" 
      ADD CONSTRAINT "portfolios_stock_id_stocks_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
   END IF;
END $$;
--> statement-breakpoint

-- Add foreign key constraint for "transactions" user_id if it doesn't already exist
DO $$ 
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'transactions_user_id_users_id_fk') THEN
      ALTER TABLE "transactions" 
      ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
   END IF;
END $$;
--> statement-breakpoint

-- Add foreign key constraint for "transactions" stock_id if it doesn't already exist
DO $$ 
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'transactions_stock_id_stocks_id_fk') THEN
      ALTER TABLE "transactions" 
      ADD CONSTRAINT "transactions_stock_id_stocks_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
   END IF;
END $$;

-- Change user_id from UUID to TEXT in portfolios table
ALTER TABLE "portfolios" 
    ALTER COLUMN "user_id" TYPE TEXT USING "user_id"::TEXT;

-- Change stock_id from UUID to TEXT in portfolios table
ALTER TABLE "portfolios" 
    ALTER COLUMN "stock_id" TYPE TEXT USING "stock_id"::TEXT;

-- Change user_id from UUID to TEXT in transactions table
ALTER TABLE "transactions" 
    ALTER COLUMN "user_id" TYPE TEXT USING "user_id"::TEXT;

-- Change stock_id from UUID to TEXT in transactions table
ALTER TABLE "transactions" 
    ALTER COLUMN "stock_id" TYPE TEXT USING "stock_id"::TEXT;

-- Change id from UUID to TEXT in users table
ALTER TABLE "users" 
    ALTER COLUMN "id" TYPE TEXT USING "id"::TEXT;

-- Change id from UUID to TEXT in stocks table (if needed)
ALTER TABLE "stocks" 
    ALTER COLUMN "id" TYPE TEXT USING "id"::TEXT;
