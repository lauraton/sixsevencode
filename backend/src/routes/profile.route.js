import { Router } from "express";
import { createProfile, getProfile, updateProfile } from "../controllers/profile.controller.js";
import { createProfileValidation, updateProfileValidation } from "../middlewares/validations/profile.validation.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"

export const profileRouter = Router();

profileRouter.post("/profile", authMiddleware, createProfileValidation, validate, createProfile)
profileRouter.get("/profile", authMiddleware, getProfile);
profileRouter.put("/profile", authMiddleware, updateProfileValidation, validate, updateProfile)
