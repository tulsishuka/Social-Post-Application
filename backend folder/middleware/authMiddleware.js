import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "No token, access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // token contains { id, username } when signed
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
