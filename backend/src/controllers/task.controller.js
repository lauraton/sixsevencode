import { matchedData } from "express-validator"
import { TaskModel } from "../models/task.model.js"
import { TaskCompletionModel } from "../models/task_completion.model.js"
import { UserModel } from "../models/user.model.js"
import { NeighborhoodModel } from "../models/neighborhood.model.js"

// Porcentaje que tiene que alcanzar un barrio para ganar la recompensa
const META_RECOMPENSA = 80

// ---------- MUNICIPIO / ADMIN ----------

export const createTask = async (req, res) => {
    try {
        const { title, description } = matchedData(req, { locations: ['body'] })

        const task = await TaskModel.create({ title, description })

        return res.status(201).json({ message: 'Tarea creada correctamente', task })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al crear la tarea" })
    }
}

export const updateTask = async (req, res) => {
    try {
        const data = matchedData(req, { locations: ['body'] })
        const { id } = req.params

        const task = await TaskModel.findByPk(id)

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" })
        }

        await task.update(data)
        return res.status(200).json({ message: "Tarea actualizada", task })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al actualizar la tarea" })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        const task = await TaskModel.findByPk(id)

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" })
        }

        await task.destroy()
        return res.status(200).json({ message: "Tarea eliminada" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al eliminar la tarea" })
    }
}

// ---------- CUALQUIER USUARIO LOGUEADO ----------

// Lista de tareas activas
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.findAll({ where: { active: true } })
        return res.status(200).json({ tasks })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al obtener las tareas" })
    }
}

// El vecino marca una tarea como hecha y manda la foto
export const completeTask = async (req, res) => {
    try {
        const { photo_url } = matchedData(req, { locations: ['body'] })
        const task_id = req.params.id
        const user_id = req.userData.user_id

        const user = await UserModel.findByPk(user_id)

        if (!user.barrio_id) {
            return res.status(400).json({ message: "Tenes que tener un barrio asignado para completar tareas" })
        }

        const yaLaHizo = await TaskCompletionModel.findOne({ where: { user_id, task_id } })

        if (yaLaHizo) {
            return res.status(400).json({ message: "Ya completaste esta tarea" })
        }

        await TaskCompletionModel.create({
            user_id,
            task_id,
            barrio_id: user.barrio_id,
            photo_url
        })

        return res.status(201).json({ message: "Tarea completada, gracias por colaborar!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al completar la tarea" })
    }
}

// Las tareas que ya completó el usuario logueado
export const getMyCompletedTasks = async (req, res) => {
    try {
        const completadas = await TaskCompletionModel.findAll({
            where: { user_id: req.userData.user_id },
            include: { model: TaskModel, as: 'tarea' }
        })
        return res.status(200).json({ completadas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al obtener tus tareas" })
    }
}

// ---------- PROGRESO POR BARRIO ----------

// Calcula el % de un barrio:
// completadas / (vecinos del barrio x tareas activas) x 100
const calcularProgreso = async (barrio) => {
    const vecinos = await UserModel.count({
        where: { barrio_id: barrio.id, role: 'CIUDADANO' }
    })

    const tareasActivas = await TaskModel.count({ where: { active: true } })

    const completadas = await TaskCompletionModel.count({
        where: { barrio_id: barrio.id },
        include: { model: TaskModel, as: 'tarea', where: { active: true } }
    })

    const posibles = vecinos * tareasActivas
    const porcentaje = posibles === 0 ? 0 : Math.round((completadas / posibles) * 100)

    return {
        barrio_id: barrio.id,
        barrio: barrio.name,
        vecinos,
        tareasActivas,
        completadas,
        porcentaje,
        meta: META_RECOMPENSA,
        ganoRecompensa: porcentaje >= META_RECOMPENSA
    }
}

// Progreso de UN barrio (lo puede ver cualquiera logueado)
export const getNeighborhoodProgress = async (req, res) => {
    try {
        const barrio = await NeighborhoodModel.findByPk(req.params.id)

        if (!barrio) {
            return res.status(404).json({ message: "Barrio no encontrado" })
        }

        const progreso = await calcularProgreso(barrio)
        return res.status(200).json(progreso)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al calcular el progreso" })
    }
}

// Ranking de TODOS los barrios, de mayor a menor % (para el municipio)
export const getAllNeighborhoodsProgress = async (req, res) => {
    try {
        const barrios = await NeighborhoodModel.findAll()

        const ranking = []
        for (const barrio of barrios) {
            ranking.push(await calcularProgreso(barrio))
        }

        ranking.sort((a, b) => b.porcentaje - a.porcentaje)

        return res.status(200).json({ ranking })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al calcular el ranking" })
    }
}
