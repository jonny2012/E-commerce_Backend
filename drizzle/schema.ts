import {
  pgTable,
  unique,
  integer,
  varchar,
  serial,
  text,
} from "drizzle-orm/pg-core";

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

export const devices = pgTable("devices", {
  id: serial().primaryKey().notNull(),
  name: text().notNull(),
  price: integer().notNull(),
  rating: integer().default(0).notNull(),
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

export const users = pgTable(
  "users",
  {
    id: serial().primaryKey().notNull(),
    username: text().notNull(),
    email: varchar({ length: 255 }).notNull(),
    password: text().notNull(),
    role: text().default("USER"),
  },
  (table) => [unique("users_email_unique").on(table.email)]
);
