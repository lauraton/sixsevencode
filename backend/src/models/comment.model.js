import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js"; // Ajustá según tu ruta de DB

export const CommentModel = sequelize.define("Comment", {
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  paranoid: true
});

// Relaciones: Un Post tiene muchos comentarios, un Usuario tiene muchos posts/comentarios
// Recordá definir estas asociaciones en tu archivo de inicialización de modelos:
// UserModel.hasMany(PostModel, { foreignKey: 'user_id' });
// PostModel.belongsTo(UserModel, { foreignKey: 'user_id' });
// PostModel.hasMany(CommentModel, { foreignKey: 'post_id' });
// CommentModel.belongsTo(UserModel, { foreignKey: 'user_id' });