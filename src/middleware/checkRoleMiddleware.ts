import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.ts";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export interface CustomRequest extends Request {
  user: JwtPayload | any;
}

export function checkRoleMiddleware(role: string) {
  return function (req: CustomRequest, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Unautorized" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      if (decoded) {
        return next(ApiError.unauthorized("No access"));
      }
      req.user = decoded;

      next();
    } catch (err) {
      res.status(401).json({ message: "Unautorized" });
    }
  };
}
