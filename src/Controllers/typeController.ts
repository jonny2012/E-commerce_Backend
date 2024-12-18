import { db } from "../db/index.ts";
import typeService from "../Services/typeService.ts";
import ApiError from "../errors/ApiError";
import { Request, Response, NextFunction } from "express";
import { typeTable } from "../db/schema.ts";
import { eq } from "drizzle-orm";

class typeController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const types = await typeService.getTypes();

      res.json(types);
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  }
  async deleteType(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (!id) {
      return next(ApiError.badRequest("Type id not entered"));
    }
    const type = await db
      .select()
      .from(typeTable)
      .where(eq(typeTable.id, Number(id)));
    try {
      const deletedRows = await typeService.deleteType(type[0].id);
      if (deletedRows.length > 0)
        res.json({
          message: `Successfull deleted type with id ${type[0].id} `,
        });
      else res.json({ message: "Wrong type id" });
    } catch (err) {
      throw new Error(err);
    }
  }
  async createType(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    try {
      const type = await typeService.create(name);
      res.json(type);
    } catch (err) {
      console.log(err);
    }
  }
}
export default new typeController();
