import { body } from "express-validator"

export const createProfileValidation = [
    body("display_name").notEmpty().withMessage("El display name no debe ser vacio"),
    body("bio").optional().isLength({ max: 255 }).withMessage("La bio no debe superar los 255 caracteres"),
    body("avatar_url").optional().isURL().withMessage("el avatar_url debe ser una url valida"),
];

export const updateProfileValidation = [
    body("display_name").optional().notEmpty().withMessage("El display_name no debe ser vacio"),
    body("bio").optional().isLength({ max: 255 }).withMessage("la bio no debe superar los 255 caracteres"),
    body("avatar_url").optional().isURL().withMessage("el avatar_url debe ser una url valida")
]