import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as tipoUsuarioService from "../services/tipo-usuario.service";

export const getTiposUsuario = async (req: Request, res: Response) => {
  try {
    const data = await tipoUsuarioService.getTiposUsuario();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getTipoUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await tipoUsuarioService.getTipoUsuarioById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createTipoUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const data = await tipoUsuarioService.createTipoUsuario({ nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateTipoUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre } = req.body;
    const data = await tipoUsuarioService.updateTipoUsuario(id, { nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteTipoUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await tipoUsuarioService.deleteTipoUsuario(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

