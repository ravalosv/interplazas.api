import { Router } from "express";
import * as tipoUsuarioController from "../controller/tipo-usuario.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole(["admin"]), tipoUsuarioController.getTiposUsuario);
router.get("/:id", checkJwt, checkRole(["admin"]), tipoUsuarioController.getTipoUsuario);
router.post("/", checkJwt, checkRole(["admin"]), tipoUsuarioController.createTipoUsuario);
router.put("/:id", checkJwt, checkRole(["admin"]), tipoUsuarioController.updateTipoUsuario);
router.delete("/:id", checkJwt, checkRole(["admin"]), tipoUsuarioController.deleteTipoUsuario);

export { router };

