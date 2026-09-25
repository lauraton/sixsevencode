import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidations = [
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
    body('role')
        .optional()
        .isIn(['CIUDADANO', 'MUNICIPIO', 'ADMIN'])
        .withMessage("El rol debe ser 'CIUDADANO', 'MUNICIPIO' o 'ADMIN'"),
    body('neighborhood')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('El barrio debe tener entre 2 y 100 caracteres')
]

export const updateUserValidations = [
    param('id')
        .isNumeric()
        .withMessage('El ID debe ser numerico'),
    body('name')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('lastname')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('El apellido debe tener entre 2 y 50 caracteres'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('El formato del email no es valido.')
        .custom(async (email, { req }) => {
            const existEmail = await UserModel.findOne({ where: { email } })
            if (existEmail && String(existEmail.id) !== String(req.params.id)) {
                throw new Error('Ese correo ya esta registrado')
            }
            return true
        }),
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener un minimo de 8 caracteres.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos una letra minuscula, una mayuscula y un numero.'),
    body('role')
        .optional()
        .isIn(['CIUDADANO', 'MUNICIPIO', 'ADMIN'])
        .withMessage("El rol debe ser 'CIUDADANO', 'MUNICIPIO' o 'ADMIN'"),
    body('neighborhood')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('El barrio debe tener entre 2 y 100 caracteres')
]

export const idUserValidations = [
    param('id')
        .isNumeric()
        .withMessage('El ID debe ser numerico')
]
