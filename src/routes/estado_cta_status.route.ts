import { Router } from "express";
import * as estadoController from "../controller/estado-cta-status.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3, 4]), estadoController.getEstadosCtaStatus);
router.get("/:id", checkJwt, checkRole([1, 3]), estadoController.getEstadoCtaStatus);
router.post("/", checkJwt, checkRole([1, 3]), estadoController.createEstadoCtaStatus);
router.put("/:id", checkJwt, checkRole([1, 3]), estadoController.updateEstadoCtaStatus);
router.delete("/:id", checkJwt, checkRole([1, 3]), estadoController.deleteEstadoCtaStatus);

export { router };
