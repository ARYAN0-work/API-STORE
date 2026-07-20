import { Request, Response } from 'express';
import { registerService, loginService } from './auth.service';

export const register = async (req: Request, res: Response) => {
  const result = await registerService(req.body);

  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await loginService(req.body);
  res.status(200).json(result);
};

export const us = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    user: (req as any).user,
  });
};
