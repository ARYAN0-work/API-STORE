import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user-model";

export const authenticate = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({
    success: false,
    message: "Authentication required",
  });
 }

 const token = authHeader.split(" ")[1];

 const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

 const user = await User.findById(decoded.userId);

 if (!user) {
  return res.status(401).json({
    success: false,
    message: "User not found",
  });
}

  (req as any).user = user;
  next()
}