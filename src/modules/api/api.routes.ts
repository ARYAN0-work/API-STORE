import { Router } from "express";
import {  createApi, getApi, getSingleApi, updateApi, deleteApi} from "./api.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { apiKeyMiddleware } from "../../middlewares/apiKey.middleware";

const router = Router();

router.post("/", authenticate, createApi);

router.get("/", authenticate, getApi);

router.get(
  "/protected",
  authenticate,
  apiKeyMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Protected API accessed successfully",
    });
  }
);

router.get("/:id", authenticate, getSingleApi);

router.patch("/:id", authenticate, updateApi);

router.delete("/:id", authenticate, deleteApi);


export default router;