
import { Router } from "express";
import userController from "../Controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


export const userRouter = new Router()
userRouter.post('/register', userController.createUser)
userRouter.post('/login', userController.login)
userRouter.get('/auth', authMiddleware, userController.checkAuth)
