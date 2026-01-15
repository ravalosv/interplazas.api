import { Router } from "express";
import * as costosController from "../controller/costos.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1]), costosController.getCostos);
router.get("/:id", checkJwt, checkRole([1]), costosController.getCosto);
router.post("/", checkJwt, checkRole([1]), costosController.createCosto);
router.put("/:id", checkJwt, checkRole([1]), costosController.updateCosto);
router.delete("/:id", checkJwt, checkRole([1]), costosController.deleteCosto);

export { router };
