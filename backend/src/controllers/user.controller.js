import { matchedData } from "express-validator"
import { UserModel } from "../models/user.model.js"
import { hashPassword } from "../helpers/bcrypt.helper.js"

export const createUser = async (req, res) => {
    try {
        const { nombre, apellido, email, password, rol, barrio } = matchedData(req, { locations: ['body'] })

        const hashedPassword = await hashPassword(password)

        await UserModel.create({
            nombre,
            apellido,
            email,
            password: hashedPassword,
            rol,
            barrio
        })

        return res.status(201).json({ message: 'Se creo el usuario correctamente' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al crear el usuario" })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            attributes: { exclude: ['password'] }
        })
        return res.status(200).json({ users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al obtener los usuarios" })
    }
}

export const getUserByPK = async (req, res) => {
    try {
        const { id } = req.params

        const user = await UserModel.findByPk(id, {
            attributes: { exclude: ['password'] }
        })

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        return res.status(200).json({ user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al obtener el usuario" })
    }
}

export const updateUser = async (req, res) => {
    try {
        const data = matchedData(req, { locations: ['body'] })
        const { id } = req.params

        const userExist = await UserModel.findByPk(id)

        if (!userExist) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        if (data.password) {
            data.password = await hashPassword(data.password)
        }

        await userExist.update(data)

        // Sacamos la contraseña antes de devolver el usuario
        const { password, ...user } = userExist.toJSON()

        return res.status(200).json({ message: "Usuario actualizado exitosamente", user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al actualizar el usuario" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const userExist = await UserModel.findByPk(id)

        if (!userExist) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        await userExist.destroy()
        return res.status(200).json({ message: "Usuario eliminado exitosamente" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al eliminar el usuario" })
    }
}
