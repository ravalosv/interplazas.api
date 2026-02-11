import { Router } from "express";
import * as grupoController from "../controller/grupo.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3]), grupoController.getGrupos);
router.get("/:id", checkJwt, checkRole([1, 3]), grupoController.getGrupo);
router.post("/", checkJwt, checkRole([1, 3]), grupoController.createGrupo);
router.put("/:id", checkJwt, checkRole([1, 3]), grupoController.updateGrupo);
router.delete("/:id", checkJwt, checkRole([1, 3]), grupoController.deleteGrupo);

export { router };
