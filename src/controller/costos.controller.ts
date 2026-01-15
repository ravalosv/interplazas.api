import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as costosService from "../services/costos.service";

export const getCostos = async (req: Request, res: Response) => {
  try {
    const data = await costosService.getCostos();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getCosto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await costosService.getCostoById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createCosto = async (req: Request, res: Response) => {
  try {
    const { costo_servicio } = req.body;
    const data = await costosService.createCosto({ costo_servicio });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateCosto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { costo_servicio } = req.body;
    const data = await costosService.updateCosto(id, { costo_servicio });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteCosto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await costosService.deleteCosto(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
