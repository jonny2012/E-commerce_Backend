import ApiError from "../errors/ApiError.ts";
import * as bcrypt from "bcrypt";
import userService from "../Services/userService.ts";

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middleware/checkRoleMiddleware.ts";
import { db } from "../db/index.ts";
import { basketsTable } from "../db/schema.ts";

class userController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;
    try {
      const user = await userService.getOneUser(email);
      console.log(user);
      if (user) {
        next(ApiError.badRequest("Email is already registered"));
        return;
      }
      const cryptedpassword = await bcrypt.hash(password, 3);
      const newUser = await userService.createUser(
        username,
        email,
        cryptedpassword
      );
      console.log(newUser);
      const basket = await db
        .insert(basketsTable)
        .values({ userId: newUser[0].id });
      res.json({ message: "User successfull registred" });
    } catch (err) {
      next(ApiError.badRequest(err));
      console.log(err);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      if (!email && !password)
        next(ApiError.badRequest("Wrong email or password"));
      const user = await userService.getOneUser(email);
      if (user) {
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid)
          return next(ApiError.unauthorized("wrong password"));
      } else return next(ApiError.unauthorized("wrong  email"));

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({ token, user });
    } catch (err) {
      next(ApiError.unauthorized(err.message));
    }
  }

  async checkAuth(req: CustomRequest, res: Response, next: NextFunction) {
    const user = req.user;

    try {
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({ token, user });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}
export default new userController();
