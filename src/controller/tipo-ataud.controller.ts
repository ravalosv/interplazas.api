import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as tipoAtaudService from "../services/tipo-ataud.service";

export const getTiposAtaud = async (req: Request, res: Response) => {
  try {
    const data = await tipoAtaudService.getTiposAtaud();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getTipoAtaud = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await tipoAtaudService.getTipoAtaudById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createTipoAtaud = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const data = await tipoAtaudService.createTipoAtaud({ nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateTipoAtaud = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre } = req.body;
    const data = await tipoAtaudService.updateTipoAtaud(id, { nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteTipoAtaud = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await tipoAtaudService.deleteTipoAtaud(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
