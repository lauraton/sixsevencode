import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserByPK, updateUser } from "../controllers/user.controller.js";
import { createUserValidations, idUserValidations, updateUserValidations } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";


export const userRoutes = Router();

userRoutes.get('/api/users', authMiddleware, adminMiddleware, getAllUsers)
userRoutes.get('/api/users/:id', authMiddleware, adminMiddleware, idUserValidations, validate, getUserByPK)
userRoutes.post('/api/users', authMiddleware, adminMiddleware, createUserValidations, validate, createUser)
userRoutes.put('/api/users/:id', authMiddleware, adminMiddleware, updateUserValidations, validate, updateUser)
userRoutes.delete('/api/users/:id',  authMiddleware, adminMiddleware, idUserValidations, validate, deleteUser)
