import express from "express";
import { startDB } from "./src/config/database.js";

const port = 6767;
const app = express();

app.listen(port, async () => {
    await startDB();
    console.log("Servidor ejecutándose en el puerto",port)
})

app.use(express.json());
