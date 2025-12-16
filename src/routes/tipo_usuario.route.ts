import { Router } from "express";
import * as tipoUsuarioController from "../controller/tipo-usuario.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1]), tipoUsuarioController.getTiposUsuario);
router.get("/:id", checkJwt, checkRole([1]), tipoUsuarioController.getTipoUsuario);
router.post("/", checkJwt, checkRole([1]), tipoUsuarioController.createTipoUsuario);
router.put("/:id", checkJwt, checkRole([1]), tipoUsuarioController.updateTipoUsuario);
router.delete("/:id", checkJwt, checkRole([1]), tipoUsuarioController.deleteTipoUsuario);

export { router };

