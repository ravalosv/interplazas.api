import { Router } from "express";
import { generarEstadoCuenta, getMovimientos, createMovimiento, getTiposMovimiento, updateMovimiento, uploadComprobante, deleteComprobante } from "../controller/estado-cuenta.controller";
import { checkJwt } from "../core/middleware/session.middleware";
import multerMiddleware from "../core/middleware/file.middleware";

const router = Router();

router.post("/generar", checkJwt, generarEstadoCuenta);
router.get("/movimientos", checkJwt, getMovimientos);
router.post("/movimiento", checkJwt, multerMiddleware.single("file"), createMovimiento);
router.put("/movimiento/:id", checkJwt, updateMovimiento);
router.post("/movimiento/:id/comprobante", checkJwt, multerMiddleware.single("file"), uploadComprobante);
router.delete("/movimiento/:id/comprobante", checkJwt, deleteComprobante);
router.get("/tipos-movimiento", checkJwt, getTiposMovimiento);

export { router };
