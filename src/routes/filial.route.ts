import { Router } from "express";
import * as filialController from "../controller/filial.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole(["admin"]), filialController.getFiliales);
router.get("/:id", checkJwt, checkRole(["admin"]), filialController.getFilial);
router.post("/", checkJwt, checkRole(["admin"]), filialController.createFilial);
router.put("/:id", checkJwt, checkRole(["admin"]), filialController.updateFilial);
router.delete("/:id", checkJwt, checkRole(["admin"]), filialController.deleteFilial);

export { router };

