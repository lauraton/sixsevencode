import { body } from "express-validator";

export const createPostValidations = [
  body("titulo")
    .notEmpty().withMessage("El título es obligatorio")
    .trim(),
  body("contenido")
    .notEmpty().withMessage("El contenido es obligatorio")
    .trim(),
  body("categoria")
    .optional()
    .isIn(['EXPERIENCIA_DENGUE', 'ALERTA_CRIADERO', 'CONSEJO_PREVENCION', 'GENERAL'])
    .withMessage("Categoría inválida")
];

export const addCommentValidations = [
  body("contenido")
    .notEmpty().withMessage("El contenido del comentario es obligatorio")
    .trim()
];