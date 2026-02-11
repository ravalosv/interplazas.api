import { Router } from "express";
import * as filialController from "../controller/filial.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 2, 3]), filialController.getFiliales);
router.get("/:id", checkJwt, checkRole([1, 3]), filialController.getFilial);
router.post("/", checkJwt, checkRole([1, 3]), filialController.createFilial);
router.put("/:id", checkJwt, checkRole([1, 3]), filialController.updateFilial);
router.delete("/:id", checkJwt, checkRole([1, 3]), filialController.deleteFilial);

export { router };

