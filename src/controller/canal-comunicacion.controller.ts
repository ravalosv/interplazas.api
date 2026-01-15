import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as canalService from "../services/canal-comunicacion.service";

export const getCanalesComunicacion = async (req: Request, res: Response) => {
  try {
    const data = await canalService.getCanalesComunicacion();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    return res.send(ret);
  }
};

export const getCanalComunicacion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await canalService.getCanalComunicacionById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    return res.send(ret);
  }
};

export const createCanalComunicacion = async (req: Request, res: Response) => {
  try {
    const { nombre, whatsApp } = req.body;
    const data = await canalService.createCanalComunicacion({ nombre, whatsApp });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    return res.send(ret);
  }
};

export const updateCanalComunicacion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre, whatsApp } = req.body;
    const data = await canalService.updateCanalComunicacion(id, { nombre, whatsApp });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    return res.send(ret);
  }
};

export const deleteCanalComunicacion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await canalService.deleteCanalComunicacion(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    return res.send(ret);
  }
};

