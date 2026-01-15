import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as grupoService from "../services/grupo.service";

export const getGrupos = async (req: Request, res: Response) => {
  try {
    const data = await grupoService.getGrupos();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getGrupo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await grupoService.getGrupoById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createGrupo = async (req: Request, res: Response) => {
  try {
    const { nombre, cobroEntreFiliales } = req.body;
    const data = await grupoService.createGrupo({ nombre, cobroEntreFiliales });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateGrupo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre, cobroEntreFiliales } = req.body;
    const data = await grupoService.updateGrupo(id, { nombre, cobroEntreFiliales });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteGrupo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await grupoService.deleteGrupo(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
