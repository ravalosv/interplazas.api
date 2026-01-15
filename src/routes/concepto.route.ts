import { Router } from "express";
import * as conceptoController from "../controller/concepto.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1]), conceptoController.getConceptos);
router.get("/:id", checkJwt, checkRole([1]), conceptoController.getConcepto);
router.post("/", checkJwt, checkRole([1]), conceptoController.createConcepto);
router.put("/:id", checkJwt, checkRole([1]), conceptoController.updateConcepto);
router.delete("/:id", checkJwt, checkRole([1]), conceptoController.deleteConcepto);

export { router };
