import { Request, Response } from "express";
import { apiService } from "./api.service";

export const createApi = async (
  req: Request,
  res: Response
) => {
   const api = await apiService.createApi(req.body,(req as any).user._id);

   return res.status(201).json({
    success: true,
    data: api,
   });
};