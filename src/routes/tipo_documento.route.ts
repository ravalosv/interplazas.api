import { Router } from "express";
import * as tipoDocumentoController from "../controller/tipo-documento.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1]), tipoDocumentoController.getTiposDocumento);
router.get("/:id", checkJwt, checkRole([1]), tipoDocumentoController.getTipoDocumento);
router.post("/", checkJwt, checkRole([1]), tipoDocumentoController.createTipoDocumento);
router.put("/:id", checkJwt, checkRole([1]), tipoDocumentoController.updateTipoDocumento);
router.delete("/:id", checkJwt, checkRole([1]), tipoDocumentoController.deleteTipoDocumento);

export { router };
