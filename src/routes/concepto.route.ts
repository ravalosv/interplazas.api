import { Router } from "express";
import * as conceptoController from "../controller/concepto.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3, 4]), conceptoController.getConceptos);
router.get("/:id", checkJwt, checkRole([3]), conceptoController.getConcepto);
router.post("/", checkJwt, checkRole([3]), conceptoController.createConcepto);
router.put("/:id", checkJwt, checkRole([3]), conceptoController.updateConcepto);
router.delete("/:id", checkJwt, checkRole([3]), conceptoController.deleteConcepto);

export { router };
