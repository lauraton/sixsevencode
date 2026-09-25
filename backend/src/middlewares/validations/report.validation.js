import { body, param } from "express-validator";

export const createReportValidation = [
  body("descripcion").notEmpty().withMessage("La descripcion no debe ser vacia"),
  body("tipo_foco")
    .isIn(["agua_estancada", "basural", "neumaticos", "otro"])
    .withMessage("El tipo_foco no es valido"),
  body("barrio").optional().notEmpty().withMessage("El barrio no debe ser vacio"),
  body("latitud").optional().isFloat().withMessage("La latitud debe ser un numero"),
  body("longitud").optional().isFloat().withMessage("La longitud debe ser un numero"),
];

export const updateReportEstadoValidation = [
  param("id").isNumeric().withMessage("El ID debe ser numerico"),
  body("estado")
    .optional()
    .isIn(["pendiente", "visto", "en_revision", "resuelto"])
    .withMessage("El estado no es valido"),
  body("comentario_admin").optional().isLength({ max: 500 }).withMessage("El comentario no debe superar los 500 caracteres"),
];