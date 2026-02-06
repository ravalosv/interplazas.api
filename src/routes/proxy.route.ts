import { Router } from "express";
import * as proxyController from "../controller/proxy.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

// Endpoint para consultar contrato a través de proxy
// POST /api/proxy/contrato
router.post("/contrato", checkJwt, proxyController.consultarContrato);

export { router };
