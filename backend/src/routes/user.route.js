import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserByPK, updateUser } from "../controllers/user.controller.js";
import { createUserValidations, idUserValidations, updateUserValidations } from "../middlewares/validations/user.validations.js";
import { validate } from "../middlewares/validate.middleware.js";


export const userRoutes = Router();

userRoutes.get('/api/users', getAllUsers)
userRoutes.get('/api/users/:id', idUserValidations, validate, getUserByPK)
userRoutes.post('/api/users', createUserValidations, validate, createUser)
userRoutes.put('/api/users/:id', updateUserValidations, validate, updateUser)
userRoutes.delete('/api/users/:id', idUserValidations, validate, deleteUser)
