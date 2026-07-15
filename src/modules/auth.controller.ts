import { Request,Response } from "express";
import { registerService } from "./auth.service";

export const register = async (req:Request,res:Response)=>{
    const result = await registerService(req.body);

    res.status(201).json(result);
}
