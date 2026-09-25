import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const NeighborhoodModel = sequelize.define("Barrio", {
    name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
})
