import { NeighborhoodModel } from "../models/neighborhood.model.js"
import { NEIGHBORHOOD } from "../data/neighborhood.data.js"

// Carga los barrios en la base de datos si todavía no están
export const seedBarrios = async () => {
    try {
        const cantidad = await NeighborhoodModel.count()

        if (cantidad > 0) {
            return // ya estaban cargados, no hacemos nada
        }

        const barrios = NEIGHBORHOOD.map((name) => ({ name }))
        await NeighborhoodModel.bulkCreate(barrios)
        console.log(`Se cargaron ${barrios.length} barrios`)
    } catch (error) {
        console.error("No se pudieron cargar los barrios:", error)
    }
}
