import express from "express";
import cookieParser from "cookie-parser";
import { startDB } from "./src/config/database.js";
import { userRoutes } from "./src/routes/user.route.js";
import { profileRouter } from "./src/routes/profile.route.js"
import { authRoutes } from "./src/routes/auth.route.js"
import { barrioRoutes } from "./src/routes/neighborhood.route.js";
import { seedNeighborhoods } from "./src/config/seed.js";
import { taskRoutes } from "./src/routes/task.route.js";   // arriba, con los otros imports

const port = 6767;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(userRoutes)
app.use(authRoutes)
app.use(barrioRoutes)
app.use("/api", profileRouter);
app.use(taskRoutes)

app.listen(port, async () => {
    await startDB();
    await seedNeighborhoods();
    console.log("Servidor ejecutándose en el puerto",port)
})

