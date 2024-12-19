import { Router } from "express";
import typeController from "../Controllers/typeController.ts";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.ts";

export const typeRouter = Router();
typeRouter.post("/", checkRoleMiddleware("ADMIN"), typeController.createType);
typeRouter.get("/", typeController.getAll);
typeRouter.delete("/:id", typeController.deleteType);
