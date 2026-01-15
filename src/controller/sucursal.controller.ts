import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as sucursalService from "../services/sucursal.service";

export const getSucursales = async (req: Request, res: Response) => {
  try {
    const data = await sucursalService.getSucursales();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getSucursal = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await sucursalService.getSucursalById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createSucursal = async (req: Request, res: Response) => {
  try {
    const { nombre, filialId } = req.body;
    const data = await sucursalService.createSucursal({ nombre, filialId });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateSucursal = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre, filialId } = req.body;
    const data = await sucursalService.updateSucursal(id, { nombre, filialId });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteSucursal = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await sucursalService.deleteSucursal(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

