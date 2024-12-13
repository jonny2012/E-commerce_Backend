import ApiError from "../errors/ApiError.ts";
import brandService from "../Services/brandService.ts";

class brandController {
  async getBrands(req, res, next) {
    try {
      const brands = await brandService.getAllBrands();
      res.json(brands);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createBrand(req, res) {
    try {
      const brand = await brandService.createBrand(req.body.name);
      res.json(brand);
    } catch (err) {
      console.log(err);
    }
  }
}
export default new brandController();
