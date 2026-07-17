import { Router } from "express";
import authRouter from "../modules/auth/auth.routes"
import apiRouter from "../modules/api/api.routes";
import apiKeyRoutes from "../modules/api-key/apiKey.routes";

const router = Router();

router.get("/",(req,res)=>{
  res.json({message:"Server's running "})
})

router.use("/auth", authRouter);
router.use("/api", apiRouter);
router.use("/api-keys", apiKeyRoutes);

router.get("/error",(req,res)=>{
  throw new Error("Testing global error handler")
})

export default router;