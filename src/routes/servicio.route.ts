import { Router } from "express";
import {
  getServicios,
  getServiciosByMonthYear,
  createServicio,
  getServicioById,
  updateServicio,
  updatePenalizadoStatus,
  deleteServicio,
} from "../controller/servicio.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, getServicios);
router.get("/fecha/:year/:month", checkJwt, getServiciosByMonthYear);
router.post("/", checkJwt, createServicio);
router.get("/:id", checkJwt, getServicioById);
router.put("/:id", checkJwt, updateServicio);
router.patch("/:id/penalizado", checkJwt, updatePenalizadoStatus);
router.delete("/:id", checkJwt, deleteServicio);

export default router;
