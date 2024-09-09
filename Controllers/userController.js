import ApiError from "../errors/ApiError.js";
import * as bcrypt from "bcrypt";
import userService from "../Services/userService.js";
import { Basket } from "../models/models.js";
import jwt from "jsonwebtoken";

class userController {
  async createUser(req, res, next) {
    const { email, password, role } = req.body;
    try {
      const user = await userService.getOneUser(email);
      if (user) {
        next(ApiError.unauthorized("Email is already registered"));
        return;
      }
      const cryptedpassword = await bcrypt.hash(password, 3);
      const newUser = await userService.createUser(
        email,
        cryptedpassword,
        role
      );

      const basket = await Basket.create({ userId: newUser.id });
      res.json("User successfull registred");
    } catch (err) {
      next(ApiError.badRequest(err));
    }
  }

  async login(req, res, next) {
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
      res.json({ token });
    } catch (err) {
      next(ApiError.unauthorized(err.message));
    }
  }

  async checkAuth(req, res, next) {
    const user = req.user;

    try {
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}
export default new userController();
