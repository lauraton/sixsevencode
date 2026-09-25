import { matchedData } from "express-validator";
import { ReportModel } from "../models/report.model.js";
import { UserModel } from "../models/user.model.js";

// Ciudadano crea un reporte
export const createReport = async (req, res) => {
  try {
    const { user_id: idUser } = req.userData;
    const datos = matchedData(req, { locations: ["body"] });

    const report = await ReportModel.create({ ...datos, user_id: idUser });
    return res.status(201).json(report);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Admin municipal: lista completa, ordenada por fecha (más reciente primero)
export const getReports = async (req, res) => {
  try {
    const reports = await ReportModel.findAll({
      include: [{ model: UserModel, as: "reportante", attributes: ["name", "lastname", "email", "neighborhood"] }],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Detalle de un reporte puntual
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await ReportModel.findByPk(id, {
      include: [{ model: UserModel, as: "reportante", attributes: ["name", "lastname", "email", "neighborhood"] }],
    });

    if (!report) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }

    return res.status(200).json(report);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Admin municipal: marcar visto / cambiar estado / dejar comentario
export const updateReportEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id: idAdmin } = req.userData;
    const datos = matchedData(req, { locations: ["body"] });

    const report = await ReportModel.findByPk(id);

    if (!report) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }

    await report.update({ ...datos, revisado_por: idAdmin });

    // Notificación automática al usuario -> versión simple para la hackatón:
    // el campo "estado" cambiado ya queda guardado, y el usuario lo ve
    // la próxima vez que consulte GET /reportes/mios (ver abajo).
    // Si da el tiempo, esto se puede mandar por email con nodemailer.

    return res.status(200).json({ message: "Reporte actualizado correctamente", report });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Ciudadano: ver sus propios reportes (para que "reciba" la notificación al consultar)
export const getMisReports = async (req, res) => {
  try {
    const { user_id: idUser } = req.userData;
    const reports = await ReportModel.findAll({
      where: { user_id: idUser },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};