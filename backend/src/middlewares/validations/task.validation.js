import { body, param } from "express-validator"
import { TaskModel } from "../../models/task.model.js"

export const createTaskValidations = [
    body('title')
        .notEmpty()
        .withMessage('El titulo es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El titulo debe tener entre 3 y 100 caracteres'),
    body('description')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('La descripcion no puede superar los 1000 caracteres')
]

export const updateTaskValidations = [
    param('id')
        .isInt()
        .withMessage('El ID debe ser numerico'),
    body('title')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('El titulo debe tener entre 3 y 100 caracteres'),
    body('description')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('La descripcion no puede superar los 1000 caracteres'),
    body('active')
        .optional()
        .isBoolean()
        .withMessage('active debe ser true o false')
]

export const idTaskValidations = [
    param('id')
        .isInt()
        .withMessage('El ID debe ser numerico')
]

export const completeTaskValidations = [
    param('id')
        .isInt()
        .withMessage('El ID debe ser numerico')
        .bail()
        .custom(async (id) => {
            const task = await TaskModel.findByPk(id)
            if (!task || !task.active) {
                throw new Error('La tarea no existe o no esta activa')
            }
            return true
        }),
    body('photo_url')
        .notEmpty()
        .withMessage('Tenes que subir una foto como prueba')
        .bail()
        .isURL()
        .withMessage('La foto debe ser un link valido')
]
