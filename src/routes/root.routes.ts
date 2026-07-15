import { Router } from "express";
const router = Router();

router.get("/",(req,res)=>{
  res.json({
    message:"Server's running "
  })
})

router.get("/test",(req,res)=>{
  res.status(200).json({
    success:true,
    message:"Testing Server"
  })
})

router.get("/error",(req,res)=>{
  throw new Error("Testing global error handler")
})
export default router;