import { Router } from "express";
import {
  getPeriodos,
  createPeriodo,
  cerrarPeriodo,
  abrirPeriodo,
} from "../controller/periodo.controller";
import {
  crearCedulas,
  eliminarCedulas,
  getCedulasByPeriodo,
  getCedulaById,
} from "../controller/cedula.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, getPeriodos);
router.post("/", checkJwt, createPeriodo);
router.patch("/:id/cerrar", checkJwt, cerrarPeriodo);
router.patch("/:id/abrir", checkJwt, abrirPeriodo);
router.post("/crear_cedulas", checkJwt, crearCedulas);
router.delete("/eliminar_cedulas", checkJwt, eliminarCedulas);
router.get("/:periodoId/cedulas", checkJwt, getCedulasByPeriodo);
router.get("/cedulas/:id", checkJwt, getCedulaById);

export default router;
