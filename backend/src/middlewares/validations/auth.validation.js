import { body } from "express-validator"
import { UserModel } from "../../models/user.model.js"

export const registerValidations = [
    body('name')
        .notEmpty()
        .withMessage('El nombre no debe estar vacio')
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('lastname')
        .notEmpty()
        .withMessage('El apellido no debe estar vacio')
        .isLength({ min: 2, max: 50 })
        .withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('email')
        .notEmpty()
        .withMessage('El correo electronico es obligatorio.')
        .isEmail()
        .withMessage('El formato del email no es valido.')
        .custom(async (email) => {
            const existEmail = await UserModel.findOne({ where: { email } })
            if (existEmail) {
                throw new Error('Ese correo ya esta registrado')
            }
            return true
        }),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener un minimo de 8 caracteres.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos una letra minuscula, una mayuscula y un numero.'),
    body('neighborhood')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('El barrio debe tener entre 2 y 100 caracteres')
]

export const loginValidations = [
    body('email')
        .notEmpty()
        .withMessage('El correo electronico es obligatorio.')
        .isEmail()
        .withMessage('El formato del email no es valido.'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.')
]
