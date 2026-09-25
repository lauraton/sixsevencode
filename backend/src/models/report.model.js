import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ReportModel = sequelize.define(
  "Report",
  {
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    tipo_foco: {
      type: DataTypes.ENUM("agua_estancada", "basural", "neumaticos", "otro"),
      allowNull: false,
    },
    barrio: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    latitud: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitud: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "visto", "en_revision", "resuelto"),
      allowNull: false,
      defaultValue: "pendiente",
    },
    comentario_admin: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    timestamps: true, // necesitás createdAt para "ordenado por fecha"
  },
);

// Quién reportó
ReportModel.belongsTo(UserModel, { foreignKey: "user_id", as: "reportante" });
UserModel.hasMany(ReportModel, { foreignKey: "user_id", as: "reportes" });

// Qué admin lo revisó (opcional, nullable)
ReportModel.belongsTo(UserModel, { foreignKey: "revisado_por", as: "revisor" });