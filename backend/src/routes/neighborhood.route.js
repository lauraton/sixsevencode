import { Router } from "express";
import { getAllNeighborhood } from "../controllers/neighborhood.controller.js";

export const barrioRoutes = Router();

barrioRoutes.get('/api/barrios', getAllNeighborhood)
