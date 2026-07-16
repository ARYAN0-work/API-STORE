import { Router } from "express";
import authRouter from "../modules/auth/auth.routes"

const router = Router();

router.get("/",(req,res)=>{
  res.json({message:"Server's running "})
})

router.use("/auth", authRouter);

router.get("/error",(req,res)=>{
  throw new Error("Testing global error handler")
})

export default router;