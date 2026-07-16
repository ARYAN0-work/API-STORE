import { Router } from "express";
import { createApi } from "./api.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate,createApi);

export default router;