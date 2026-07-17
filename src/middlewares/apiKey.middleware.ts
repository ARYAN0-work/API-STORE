import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

import { ApiKey } from "../modules/api-key/apiKey.model";

export const apiKeyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key is required",
    });
  }

  const keyHash = crypto
    .createHash("sha256")
    .update(apiKey)
    .digest("hex");

  const storedKey = await ApiKey.findOne({
    keyHash,
    isActive: true,
  });

  if (!storedKey) {
  return res.status(401).json({
    success: false,
    message: "Invalid API key",
  });
}

   storedKey.requestCount += 1;
   storedKey.lastUsedAt = new Date();
   
   await storedKey.save();

  (req as any).apiKey = storedKey;

  next();
};