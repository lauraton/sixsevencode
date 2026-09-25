import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { loginValidations, registerValidations } from "../middlewares/validations/auth.validation.js";
import { getProfile, login, logout, register } from "../controllers/auth.controller.js";

export const authRoutes = Router();

authRoutes.post('/api/auth/register', registerValidations, validate, register)
authRoutes.post('/api/auth/login', loginValidations, validate, login)
authRoutes.post('/api/auth/logout', authMiddleware, logout)
authRoutes.get('/api/auth/profile', authMiddleware, getProfile)
