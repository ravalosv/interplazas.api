import { Router } from "express";
import * as canalController from "../controller/canal-comunicacion.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3, 4]), canalController.getCanalesComunicacion);
router.get("/:id", checkJwt, checkRole([1, 3]), canalController.getCanalComunicacion);
router.post("/", checkJwt, checkRole([1, 3]), canalController.createCanalComunicacion);
router.put("/:id", checkJwt, checkRole([1, 3]), canalController.updateCanalComunicacion);
router.delete("/:id", checkJwt, checkRole([1, 3]), canalController.deleteCanalComunicacion);

export { router };

