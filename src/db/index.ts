import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
export const db = drizzle(process.env.DATABASE_URL!, { schema });
