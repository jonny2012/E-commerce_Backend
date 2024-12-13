import { Router } from "express";
import userController from "../Controllers/userController.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

export const userRouter = Router();
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.login);
userRouter.get("/auth", authMiddleware, userController.checkAuth);
