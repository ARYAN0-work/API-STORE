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

export default router;