import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler=(err,req,res,next)=>{
    console.log(err);
    
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
}