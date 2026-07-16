import { Router } from "express";
import {register, login, us} from "./auth.controller"
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router()

router.post("/register",register)
router.post("/login",login)
router.get("/us", authenticate, us);

export default router;