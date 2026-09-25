import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"
import { UserModel } from "./user.model.js"
import { TaskModel } from "./task.model.js"
import { NeighborhoodModel } from "./neighborhood.model.js"

// Guarda que un vecino completó una tarea (con la foto como prueba)
export const TaskCompletionModel = sequelize.define("TaskCompletion", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Guardamos el barrio del vecino para poder calcular el % por barrio
    barrio_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    photo_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    // Un mismo usuario no puede completar la misma tarea dos veces
    indexes: [{ unique: true, fields: ["user_id", "task_id"] }]
})

TaskCompletionModel.belongsTo(UserModel, { foreignKey: "user_id", as: "usuario" })
TaskCompletionModel.belongsTo(TaskModel, { foreignKey: "task_id", as: "tarea" })
TaskCompletionModel.belongsTo(NeighborhoodModel, { foreignKey: "barrio_id", as: "barrio" })

UserModel.hasMany(TaskCompletionModel, { foreignKey: "user_id", as: "tareasCompletadas" })
TaskModel.hasMany(TaskCompletionModel, { foreignKey: "task_id", as: "completadas" })
