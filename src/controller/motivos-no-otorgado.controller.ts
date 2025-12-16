import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as motivosService from "../services/motivos-no-otorgado.service";

export const getMotivosNoOtorgado = async (req: Request, res: Response) => {
  try {
    const data = await motivosService.getMotivosNoOtorgado();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getMotivoNoOtorgado = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await motivosService.getMotivoNoOtorgadoById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createMotivoNoOtorgado = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const data = await motivosService.createMotivoNoOtorgado({ nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateMotivoNoOtorgado = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre } = req.body;
    const data = await motivosService.updateMotivoNoOtorgado(id, { nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteMotivoNoOtorgado = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await motivosService.deleteMotivoNoOtorgado(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
