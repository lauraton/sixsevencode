import { NeighborhoodModel } from "../models/neighborhood.model.js"

// Devuelve todos los barrios ordenados alfabéticamente (para el <select> del registro)
export const getAllNeighborhood = async (req, res) => {
    try {
        const barrios = await NeighborhoodModel.findAll({
            order: [["name", "ASC"]]
        })
        return res.status(200).json({ barrios })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocurrio un error al obtener los barrios" })
    }
}
