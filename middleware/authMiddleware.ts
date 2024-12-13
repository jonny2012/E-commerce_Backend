import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.ts";

export function authMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unautorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      res.json({ message: "Session expired" });
      return;
    }
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Unautorized" });
  }
}
