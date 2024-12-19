import { pgTable, unique, integer, text, varchar, serial } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	username: text().notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: text().notNull(),
	role: text().default('USER'),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const devices = pgTable("devices", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "devices_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	deviceName: text("device_name").notNull(),
	price: integer().notNull(),
	rating: integer().default(0).notNull(),
	brandId: integer("brand_id"),
	typeId: integer("type_id"),
});

export const basketDevices = pgTable("basketDevices", {
	id: serial().primaryKey().notNull(),
	basketId: integer("basket_id"),
	deviceId: integer("device_id"),
});

export const baskets = pgTable("baskets", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
});

export const brands = pgTable("brands", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});

export const deviceInfo = pgTable("device_info", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	image1: text().notNull(),
	image2: text().notNull(),
	image3: text(),
	image4: text(),
});

export const rating = pgTable("rating", {
	id: serial().primaryKey().notNull(),
	rate: integer().notNull(),
	userId: integer("user_id"),
	deviceId: integer("device_id"),
});

export const typeBrands = pgTable("type_brands", {
	id: serial().primaryKey().notNull(),
	typeId: integer("type_id").notNull(),
	brandId: integer("brand_id").notNull(),
});

export const types = pgTable("types", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});
