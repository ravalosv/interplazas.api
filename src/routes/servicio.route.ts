import { Router } from "express";
import {
  getServicios,
  getServiciosByMonthYear,
  getServiciosByPeriodo,
  searchServiciosByContrato,
  createServicio,
  getServicioById,
  getServicioLogs,
  updateServicio,
  updatePenalizadoStatus,
  changePeriod,
  deleteServicio,
  uploadDocument,
  deleteDocument,
  getServicioObservaciones,
  createServicioObservacion,
  deleteServicioObservacion,
  sendExpedienteEmail,
} from "../controller/servicio.controller";
import { checkJwt } from "../core/middleware/session.middleware";
import multerMiddleware from "../core/middleware/file.middleware";

const router = Router();

router.get("/", checkJwt, getServicios);
router.get("/fecha/:year/:month", checkJwt, getServiciosByMonthYear);
router.get("/periodo/:periodoId", checkJwt, getServiciosByPeriodo);
router.get("/search", checkJwt, searchServiciosByContrato);
router.post("/", checkJwt, multerMiddleware.single("file"), createServicio);
router.get("/:id", checkJwt, getServicioById);
router.get("/:id/logs", checkJwt, getServicioLogs);
router.put("/:id", checkJwt, updateServicio);
router.post("/:id/upload", checkJwt, multerMiddleware.single("file"), uploadDocument);
router.post("/:id/send-expediente-email", checkJwt, sendExpedienteEmail);
router.delete("/:id/document/:fieldName", checkJwt, deleteDocument);
router.patch("/:id/penalizado", checkJwt, updatePenalizadoStatus);
router.patch("/:id/change-period", checkJwt, changePeriod);
router.get("/:id/observaciones", checkJwt, getServicioObservaciones);
router.post("/:id/observaciones", checkJwt, createServicioObservacion);
router.delete("/:id/observaciones/:observacionId", checkJwt, deleteServicioObservacion);
router.delete("/:id", checkJwt, deleteServicio);

export default router;
