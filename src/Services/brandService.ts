import { db } from "../db";
import { brandTable } from "../db/schema";
class brandService {
  async createBrand(name: string) {
    const newBrand = await db.insert(brandTable).values({ name }).returning();
    return newBrand;
  }
  async getAllBrands() {
    const brands = await db.query.brandTable.findMany();
    return brands;
  }
}
export default new brandService();
