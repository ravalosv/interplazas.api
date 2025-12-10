import { Router } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";

const router = Router();


router.get("/info/:contrato", (req, res, next) => {
  const apiKey = req.header("api-key");
  const expectedKey = process.env.CONTRATOS_API_KEY;

  if (!apiKey) {
    const apiReturnPayload: ApiReturnPayload = { success: false, error: "API_KEY_REQUIRED" };
    return res.send(apiReturnPayload);
  }

  if (expectedKey && apiKey !== expectedKey) {
    const apiReturnPayload: ApiReturnPayload = { success: false, error: "UNAUTHORIZED" };
    return res.send(apiReturnPayload);
  }

  const contrato = req.params.contrato;
  const apiReturnPayload: ApiReturnPayload = { success: true, data: { contrato, status: "ACTIVO", saldo: 1500 } };
  return res.send(apiReturnPayload);
});

export { router };
