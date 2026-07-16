import { Router } from "express";
import { createApi } from "./api.controller";

const router = Router();

router.post("/", createApi);

export default router;