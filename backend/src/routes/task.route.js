import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { municipalityMiddleware } from "../middlewares/municipality.middleware.js";
import { completeTaskValidations, createTaskValidations, idTaskValidations, updateTaskValidations } from "../middlewares/validations/task.validation.js";
import { completeTask, createTask, deleteTask, getAllNeighborhoodsProgress, getAllTasks, getMyCompletedTasks, getNeighborhoodProgress, updateTask } from "../controllers/task.controller.js";

export const taskRoutes = Router();

// Cualquier usuario logueado
taskRoutes.get('/api/tasks', authMiddleware, getAllTasks)
taskRoutes.get('/api/tasks/me', authMiddleware, getMyCompletedTasks)
taskRoutes.post('/api/tasks/:id/complete', authMiddleware, completeTaskValidations, validate, completeTask)
taskRoutes.get('/api/barrios/:id/progress', authMiddleware, getNeighborhoodProgress)

// Solo MUNICIPIO o ADMIN
taskRoutes.post('/api/tasks', authMiddleware, municipalityMiddleware, createTaskValidations, validate, createTask)
taskRoutes.put('/api/tasks/:id', authMiddleware, municipalityMiddleware, updateTaskValidations, validate, updateTask)
taskRoutes.delete('/api/tasks/:id', authMiddleware, municipalityMiddleware, idTaskValidations, validate, deleteTask)
taskRoutes.get('/api/progress', authMiddleware, municipalityMiddleware, getAllNeighborhoodsProgress)
