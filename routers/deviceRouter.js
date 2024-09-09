
import { Router } from "express";
import deviceController from "../Controllers/deviceController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";


export const deviceRouter = new Router()
deviceRouter.post('/', checkRoleMiddleware("ADMIN"), deviceController.createDevice)
deviceRouter.get('/', deviceController.getDevices)
deviceRouter.get('/:id', deviceController.getDevicebyId)
