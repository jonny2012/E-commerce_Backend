
import { Router } from "express";
import typeController from "../Controllers/typeController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";


export const typeRouter = new Router()
typeRouter.post('/',  checkRoleMiddleware("ADMIN"), typeController.createType)
typeRouter.get('/', typeController.getAll)
typeRouter.delete("/:id", typeController.deleteType)
