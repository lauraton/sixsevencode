import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  },
);

export const startDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Conexion a la db esta lista");
  } catch (error) {
    console.error("No se pudo conectar a la db:", error);
  }
};
