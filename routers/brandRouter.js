
import { Router } from "express";
import brandController from "../Controllers/brandControllers.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";


export const brandRouter = new Router()
brandRouter.post("/", checkRoleMiddleware("ADMIN"), brandController.createBrand)
brandRouter.get("/", brandController.getBrands)