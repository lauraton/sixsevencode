import { Router } from "express";
import {
createReport,
getReports,
getReportById,
updateReportEstado,
getMisReports,
} from "../controllers/report.controller.js";
import { createReportValidation, updateReportEstadoValidation } from "../middlewares/validations/report.validation.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { municipioMiddleware } from "../middlewares/municipio.middleware.js";

export const reportRoutes = Router();

reportRoutes.post("/api/reportes", authMiddleware, createReportValidation, validate, createReport);
reportRoutes.get("/api/reportes/mios", authMiddleware, getMisReports);
reportRoutes.get("/api/reportes", authMiddleware, municipioMiddleware, getReports);
reportRoutes.get("/api/reportes/:id", authMiddleware, municipioMiddleware, getReportById);
reportRoutes.put("/api/reportes/:id/estado", authMiddleware, municipioMiddleware, updateReportEstadoValidation, validate, updateReportEstado);