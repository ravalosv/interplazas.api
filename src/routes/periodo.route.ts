import { Router } from "express";
import { getPeriodos, cerrarPeriodo, abrirPeriodo } from "../controller/periodo.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, getPeriodos);
router.patch("/:id/cerrar", checkJwt, cerrarPeriodo);
router.patch("/:id/abrir", checkJwt, abrirPeriodo);

export default router;
