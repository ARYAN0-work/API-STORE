import { Request,Response } from "express";
import { registerService } from "./auth.service";

export const register = (req:Request,res:Response)=>{
    const result = registerService();

    res.status(200).json(result);
}
