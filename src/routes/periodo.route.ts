import { Router } from "express";
import {
  getPeriodos,
  createPeriodo,
  updatePeriodo,
  cerrarPeriodo,
  abrirPeriodo,
} from "../controller/periodo.controller";
import {
  crearCedulas,
  eliminarCedulas,
  getCedulasByPeriodo,
  getCedulasByPeriodoWithDetails,
  getCedulaById,
} from "../controller/cedula.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, getPeriodos);
router.post("/", checkJwt, createPeriodo);
router.put("/:id", checkJwt, updatePeriodo);
router.patch("/:id/cerrar", checkJwt, cerrarPeriodo);
router.patch("/:id/abrir", checkJwt, abrirPeriodo);
router.post("/crear_cedulas", checkJwt, crearCedulas);
router.delete("/eliminar_cedulas", checkJwt, eliminarCedulas);
router.get("/:periodoId/cedulas", checkJwt, getCedulasByPeriodo);
router.get("/:periodoId/cedulas/detalles", checkJwt, getCedulasByPeriodoWithDetails);
router.get("/cedulas/:id", checkJwt, getCedulaById);

export default router;
