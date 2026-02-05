import { Router } from "express";
import { generarEstadoCuenta, getMovimientos } from "../controller/estado-cuenta.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

router.post("/generar", checkJwt, generarEstadoCuenta);
router.get("/movimientos", checkJwt, getMovimientos);

export { router };
