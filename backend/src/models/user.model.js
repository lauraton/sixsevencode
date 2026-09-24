import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const UserModel = sequelize.define("User", {
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido: {
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
    rol: {
        type: DataTypes.ENUM('CIUDADANO', 'MUNICIPIO', 'ADMIN'),
        allowNull: false,
        defaultValue: "CIUDADANO"
    },
    barrio: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    paranoid: true
})
