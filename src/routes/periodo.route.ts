import { Router } from "express";
import { getPeriodos, cerrarPeriodo, abrirPeriodo } from "../controller/periodo.controller";
import { crearCedulas, eliminarCedulas } from "../controller/cedula.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

/**
 * @route GET /periodo
 */
router.get("/", checkJwt, getPeriodos);

/**
 * @route PATCH /periodo/:id/cerrar
 */
router.patch("/:id/cerrar", checkJwt, cerrarPeriodo);

/**
 * @route PATCH /periodo/:id/abrir
 */
router.patch("/:id/abrir", checkJwt, abrirPeriodo);

/**
 * @route POST /periodo/crear_cedulas
 */
router.post("/crear_cedulas", checkJwt, crearCedulas);

/**
 * @route DELETE /periodo/eliminar_cedulas
 */
router.delete("/eliminar_cedulas", checkJwt, eliminarCedulas);

export default router;
