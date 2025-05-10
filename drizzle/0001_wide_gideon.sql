ALTER TABLE "stocks" ADD COLUMN "open_price" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "stocks" ADD COLUMN "high_price" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "stocks" ADD COLUMN "low_price" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "stocks" ADD COLUMN "close_price" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "stocks" ADD COLUMN "volume" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "stocks" DROP COLUMN "current_price";