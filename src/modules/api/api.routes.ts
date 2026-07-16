import { Router } from "express";
import { createApi, ,getAPi } from "./api.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post( "/", authenticate, createApi)
router.get( "/", authenticate, getApi)
export default router;