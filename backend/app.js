import express from "express";
import { startDB } from "./src/config/database.js";
import { userRoutes } from "./src/routes/user.route.js";

const port = 6767;
const app = express();

app.listen(port, async () => {
    await startDB();
    console.log("Servidor ejecutándose en el puerto",port)
})

app.use(express.json());
app.use(userRoutes)
