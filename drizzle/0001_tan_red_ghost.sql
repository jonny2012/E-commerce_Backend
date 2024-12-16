ALTER TABLE "devices" RENAME COLUMN "name" TO "device_name";--> statement-breakpoint
ALTER TABLE "devices" ADD COLUMN "brand_id" integer;--> statement-breakpoint
ALTER TABLE "devices" ADD COLUMN "type_id" integer;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE no action ON UPDATE no action;