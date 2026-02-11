import { Router } from "express";
import * as tipoServicioController from "../controller/tipo-servicio.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3, 4]), tipoServicioController.getTiposServicio);
router.get("/:id", checkJwt, checkRole([3]), tipoServicioController.getTipoServicio);
router.post("/", checkJwt, checkRole([3]), tipoServicioController.createTipoServicio);
router.put("/:id", checkJwt, checkRole([3]), tipoServicioController.updateTipoServicio);
router.delete("/:id", checkJwt, checkRole([3]), tipoServicioController.deleteTipoServicio);

export { router };
