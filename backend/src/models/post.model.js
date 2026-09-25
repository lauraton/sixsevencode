import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { CommentModel } from "./comment.model.js";

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

// Asociaciones
UserModel.hasMany(PostModel, { foreignKey: "user_id" });
PostModel.belongsTo(UserModel, { foreignKey: "user_id" });

PostModel.hasMany(CommentModel, { foreignKey: "post_id" });
CommentModel.belongsTo(PostModel, { foreignKey: "post_id" });

UserModel.hasMany(CommentModel, { foreignKey: "user_id" });
CommentModel.belongsTo(UserModel, { foreignKey: "user_id" });