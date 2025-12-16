import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as tipoDocumentoService from "../services/tipo-documento.service";

export const getTiposDocumento = async (req: Request, res: Response) => {
  try {
    const data = await tipoDocumentoService.getTiposDocumento();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getTipoDocumento = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await tipoDocumentoService.getTipoDocumentoById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createTipoDocumento = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const data = await tipoDocumentoService.createTipoDocumento({ nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateTipoDocumento = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre } = req.body;
    const data = await tipoDocumentoService.updateTipoDocumento(id, { nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteTipoDocumento = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await tipoDocumentoService.deleteTipoDocumento(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
