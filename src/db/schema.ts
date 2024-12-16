import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("USER"),
});

export const basketsTable = pgTable("baskets", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").references(() => userTable.id),
});

export const devicesTable = pgTable("devices", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity().notNull(),
  deviceName: text("name").notNull(),
  price: integer("price").notNull(),
  rating: integer("rating").notNull().default(0),
});

export const basketDeviceTable = pgTable("basketDevices", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  basketId: integer("basket_id").references(() => basketsTable.id),
  devicesId: integer("device_id").references(() => devicesTable.id),
});

export const typeTable = pgTable("types", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
});
export const brandTable = pgTable("brands", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
});

export const ratingTable = pgTable("rating", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  rate: integer("rate").notNull(),
  userId: integer("user_id").references(() => userTable.id),
  deviceId: integer("device_id").references(() => devicesTable.id),
});

export const deviceInfoTable = pgTable("device_info", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text().notNull(),
  image1: text("image1").notNull(),
  image2: text("image2").notNull(),
  image3: text("image3"),
  image4: text("image4"),
});

export const typeBrandsTable = pgTable("type_brands", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  typeId: integer("type_id")
    .notNull()
    .references(() => typeTable.id),
  brandId: integer("brand_id")
    .notNull()
    .references(() => brandTable.id),
});
