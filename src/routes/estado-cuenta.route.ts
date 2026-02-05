import { Router } from "express";
import { generarEstadoCuenta, getMovimientos, createMovimiento, getTiposMovimiento, updateMovimiento } from "../controller/estado-cuenta.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

router.post("/generar", checkJwt, generarEstadoCuenta);
router.get("/movimientos", checkJwt, getMovimientos);
router.post("/movimiento", checkJwt, createMovimiento);
router.put("/movimiento/:id", checkJwt, updateMovimiento);
router.get("/tipos-movimiento", checkJwt, getTiposMovimiento);

export { router };
