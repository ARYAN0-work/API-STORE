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

router.get("/docs", (req, res) => {
  res.status(200).json({
    name: "API Store",
    version: "1.0.0",
    description: "API Store backend service",
    endpoints: [
      {
        method: "POST",
        path: "/auth/register",
        description: "Register a new user",
      },
      {
        method: "POST",
        path: "/auth/login",
        description: "Login user",
      },
      {
        method: "POST",
        path: "/api",
        description: "Create API",
      },
      {
        method: "GET",
        path: "/api",
        description: "Get all APIs",
      },
      {
        method: "POST",
        path: "/api-keys",
        description: "Generate API key",
      },
      {
        method: "GET",
        path: "/api/protected",
        description: "Protected endpoint requiring JWT and API key",
      },
    ],
  });
});

router.get("/:id", authenticate, getSingleApi);

router.patch("/:id", authenticate, updateApi);

router.delete("/:id", authenticate, deleteApi);


export default router;