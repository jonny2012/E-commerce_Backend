
import { Router } from "express";
import { brandRouter } from "./brandRouter.js"
import { userRouter } from "./userRouter.js";
import { typeRouter } from "./typeRouter.js";
import { deviceRouter } from "./deviceRouter.js";


export const router = new Router()
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/user', userRouter)