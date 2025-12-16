import { Router } from "express";
import * as tipoAtaudController from "../controller/tipo-ataud.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1]), tipoAtaudController.getTiposAtaud);
router.get("/:id", checkJwt, checkRole([1]), tipoAtaudController.getTipoAtaud);
router.post("/", checkJwt, checkRole([1]), tipoAtaudController.createTipoAtaud);
router.put("/:id", checkJwt, checkRole([1]), tipoAtaudController.updateTipoAtaud);
router.delete("/:id", checkJwt, checkRole([1]), tipoAtaudController.deleteTipoAtaud);

export { router };
