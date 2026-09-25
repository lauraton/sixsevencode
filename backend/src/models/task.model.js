import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

// Tarea de prevención que publica el municipio
// Ej: "Dar vuelta recipientes que acumulen agua"
export const TaskModel = sequelize.define("Task", {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    paranoid: true // al borrarla no se elimina de verdad, así no se pierden las tareas ya completadas
})
