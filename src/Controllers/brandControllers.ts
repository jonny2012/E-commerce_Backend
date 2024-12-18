import ApiError from "../errors/ApiError.ts";
import brandService from "../Services/brandService.ts";
import { Request, Response, NextFunction } from "express";

class brandController {
  async getBrands(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await brandService.getAllBrands();
      res.json(brands);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async createBrand(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const brand = await brandService.createBrand(req.body.name);
      res.json(brand);
    } catch (err) {
      ApiError.internal(err);
    }
  }
}
export default new brandController();
