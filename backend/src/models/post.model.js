import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// ✅ Debe decir "export const PostModel"
export const PostModel = sequelize.define("Post", {
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  barrio: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  categoria: {
    type: DataTypes.ENUM('EXPERIENCIA_DENGUE', 'ALERTA_CRIADERO', 'CONSEJO_PREVENCION', 'GENERAL'),
    defaultValue: 'EXPERIENCIA_DENGUE'
  },
  meGustaCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  paranoid: true
});