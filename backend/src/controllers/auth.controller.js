import { matchedData } from "express-validator";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { name, lastname, email, password, neighborhood } = matchedData(req, { locations: ['body'] })

        const hashedPassword = await hashPassword(password)

        // Todo el que se registra solo es CIUDADANO (los otros roles los crea un ADMIN)
        await UserModel.create({
            name,
            lastname,
            email,
            password: hashedPassword,
            role: 'CIUDADANO',
            neighborhood
        })

        return res.status(201).json({ message: 'Se registro correctamente' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error interno del servidor" })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = matchedData(req, { locations: ['body'] })

        const userExist = await UserModel.findOne({ where: { email } })

        if (!userExist) {
            return res.status(401).json({ message: 'Credenciales invalidas' })
        }

        const validPassword = await comparePassword(password, userExist.password)

        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales invalidas' })
        }

        const token = generateToken({
            user_id: userExist.id,
            email: userExist.email,
            role: userExist.role
        })

        // Enviamos el token en una cookie
        res.cookie("token", token, {
            httpOnly: true, // No se puede leer desde JavaScript del navegador
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 5 // 5 horas (igual que el token)
        })

        return res.status(200).json({ message: "Usuario logueado correctamente" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error al loguearse" })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token") // Borra la cookie del navegador
    return res.status(200).json({ message: "Logout exitoso" })
}

export const getProfile = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.userData.user_id, {
            attributes: { exclude: ['password'] }
        })

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        return res.status(200).json({ user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error al obtener el perfil' })
    }
}
