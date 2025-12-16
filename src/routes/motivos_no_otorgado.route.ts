import { Router } from "express";
import * as motivosController from "../controller/motivos-no-otorgado.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1]), motivosController.getMotivosNoOtorgado);
router.get("/:id", checkJwt, checkRole([1]), motivosController.getMotivoNoOtorgado);
router.post("/", checkJwt, checkRole([1]), motivosController.createMotivoNoOtorgado);
router.put("/:id", checkJwt, checkRole([1]), motivosController.updateMotivoNoOtorgado);
router.delete("/:id", checkJwt, checkRole([1]), motivosController.deleteMotivoNoOtorgado);

export { router };
