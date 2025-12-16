import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as estadoService from "../services/estado-cta-status.service";

export const getEstadosCtaStatus = async (req: Request, res: Response) => {
  try {
    const data = await estadoService.getEstadosCtaStatus();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getEstadoCtaStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await estadoService.getEstadoCtaStatusById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createEstadoCtaStatus = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const data = await estadoService.createEstadoCtaStatus({ nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateEstadoCtaStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre } = req.body;
    const data = await estadoService.updateEstadoCtaStatus(id, { nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteEstadoCtaStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await estadoService.deleteEstadoCtaStatus(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
