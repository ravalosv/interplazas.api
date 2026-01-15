import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as filialService from "../services/filial.service";

export const getFiliales = async (req: Request, res: Response) => {
  try {
    const data = await filialService.getFiliales();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getFilial = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await filialService.getFilialById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createFilial = async (req: Request, res: Response) => {
  try {
    const { nombre, extranjera, grupoId } = req.body;
    const data = await filialService.createFilial({ nombre, extranjera, grupoId });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateFilial = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre, extranjera, grupoId } = req.body;
    const data = await filialService.updateFilial(id, { nombre, extranjera, grupoId });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteFilial = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await filialService.deleteFilial(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

