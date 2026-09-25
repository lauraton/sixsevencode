import { body } from "express-validator"
import { NeighborhoodModel } from "../../models/neighborhood.model.js"

// Regla reutilizable para validar el barrio elegido
export const barrioIdValidation = (opcional = false) => {
    let regla = body('barrio_id')

    if (opcional) {
        regla = regla.optional()
    } else {
        regla = regla.notEmpty().withMessage('Tenes que elegir un barrio').bail()
    }

    return regla
        .isInt()
        .withMessage('El barrio debe ser un ID numerico')
        .bail() // si no es un numero, no seguimos validando
        .custom(async (barrio_id) => {
            const existBarrio = await NeighborhoodModel.findByPk(barrio_id)
            if (!existBarrio) {
                throw new Error('Ese barrio no existe')
            }
            return true
        })
}
