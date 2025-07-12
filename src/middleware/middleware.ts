import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
