import { Router } from "express";
import * as motivosController from "../controller/motivos-no-otorgado.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3, 4]), motivosController.getMotivosNoOtorgado);
router.get("/:id", checkJwt, checkRole([3]), motivosController.getMotivoNoOtorgado);
router.post("/", checkJwt, checkRole([3]), motivosController.createMotivoNoOtorgado);
router.put("/:id", checkJwt, checkRole([3]), motivosController.updateMotivoNoOtorgado);
router.delete("/:id", checkJwt, checkRole([3]), motivosController.deleteMotivoNoOtorgado);

export { router };
