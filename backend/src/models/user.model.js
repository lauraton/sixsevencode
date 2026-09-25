import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"
import { NeighborhoodModel } from "./neighborhood.model.js"

export const UserModel = sequelize.define("User", {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('CIUDADANO', 'MUNICIPIO', 'ADMIN'),
        allowNull: false,
        defaultValue: "CIUDADANO"
    },
    barrio_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Barrios",
            key: "id"
        }
    }
    
}, {
    paranoid: true
})

UserModel.belongsTo(NeighborhoodModel, { foreignKey: "barrio_id", as: "barrio" })
NeighborhoodModel.hasMany(UserModel, { foreignKey: "barrio_id", as: "usuarios" })