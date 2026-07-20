import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

import { ApiKey } from '../modules/api-key/apiKey.model';

export const apiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key is required',
    });
  }

  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

  const storedKey = await ApiKey.findOne({
    keyHash,
    isActive: true,
  });

  if (!storedKey) {
    return res.status(401).json({
      success: false,
      message: 'Invalid API key',
    });
  }

  const oneHour = 60 * 60 * 1000;

  if (Date.now() - storedKey.windowStart.getTime() > oneHour) {
    storedKey.windowStart = new Date();
    storedKey.requestCount = 0;
  }

  if (storedKey.requestCount >= storedKey.rateLimit) {
    return res.status(429).json({
      success: false,
      message: 'Rate limit exceeded',
    });
  }

  storedKey.requestCount += 1;
  storedKey.lastUsedAt = new Date();

  await storedKey.save();

  (req as any).apiKey = storedKey;

  next();
};
