import { Request, Response } from "express";

import { generateApiKey } from "./apiKey.service";

export const createApiKey = async (req: Request,res: Response) => 
      {
        const userId = ( req as any).user._id;
        const {apiId}  = req.body;

        const data = await generateApiKey(userId, apiId);

        res.status(201).json({
            success: true,
            message: "API key generated successfully",
            data,
          });
};