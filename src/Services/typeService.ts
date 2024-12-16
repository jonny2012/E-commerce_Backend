import { db } from "../db";
import { typeTable } from "../db/schema";
import { eq } from "drizzle-orm";

class typeService {
  async create(name: string) {
    const newType = await db
      .select()
      .from(typeTable)
      .where(eq(typeTable.name, name));
    return newType;
  }

  async getTypes() {
    const types = await db.select().from(typeTable);
    return types;
  }

  async deleteType(typeId: number) {
    const rowsDeleted = await db
      .delete(typeTable)
      .where(eq(typeTable.id, typeId))
      .returning();
    return rowsDeleted;
  }
}
export default new typeService();
