import { Router } from "express";
import { createApi, getApi, getSingleApi } from "./api.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.post( "/", authenticate, createApi)
router.get( "/", authenticate, getApi)
router.get( "/:id",authenticate, getSingleApi);
export default router;