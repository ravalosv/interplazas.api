import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as conceptoService from "../services/concepto.service";

export const getConceptos = async (req: Request, res: Response) => {
  try {
    const data = await conceptoService.getConceptos();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getConcepto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await conceptoService.getConceptoById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createConcepto = async (req: Request, res: Response) => {
  try {
    const { nombre, montoMXN, montoUSD } = req.body;
    const data = await conceptoService.createConcepto({ nombre, montoMXN, montoUSD });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateConcepto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre, montoMXN, montoUSD } = req.body;
    const data = await conceptoService.updateConcepto(id, { nombre, montoMXN, montoUSD });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteConcepto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await conceptoService.deleteConcepto(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
