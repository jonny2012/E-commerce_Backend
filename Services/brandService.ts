import { Brand } from "../models/models.ts";

class brandService {
  async createBrand(name) {
    const newBrand = await Brand.create({ name });
    return newBrand;
  }

  async getAllBrands() {
    const brands = await Brand.findAll();
    return brands;
  }
}
export default new brandService();
