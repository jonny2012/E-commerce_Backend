import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";

export function checkRoleMiddleware(role) {
  return function (req, res, next) {
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
      if (decoded.role !== role) {
        return next(ApiError.unauthorized("No access"));
      }
      req.user = decoded;

      next();
    } catch (err) {
      res.status(401).json({ message: "Unautorized" });
    }
  };
}
