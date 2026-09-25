import { Router } from "express";
import { getAllBarrios } from "../controllers/barrio.controller.js";

export const barrioRoutes = Router();

barrioRoutes.get('/api/barrios', getAllBarrios)
