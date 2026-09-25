import express from "express";
import cookieParser from "cookie-parser";
import { startDB } from "./src/config/database.js";
import { userRoutes } from "./src/routes/user.route.js";
import { profileRouter } from "./src/routes/profile.route.js";
import { authRoutes } from "./src/routes/auth.route.js";
import { reportRoutes } from "./src/routes/report.routes.js";


const port = 6767;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);
app.use(authRoutes);
app.use(reportRoutes)
app.use("/api", profileRouter);


app.listen(port, async () => {
    await startDB();
    console.log("Servidor ejecutándose en el puerto", port);
});