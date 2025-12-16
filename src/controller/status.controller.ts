import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as statusService from "../services/status.service";

export const getStatus = async (req: Request, res: Response) => {
  try {
    const data = await statusService.getStatus();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getStatusItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await statusService.getStatusById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createStatusItem = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const data = await statusService.createStatus({ nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateStatusItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nombre } = req.body;
    const data = await statusService.updateStatus(id, { nombre });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteStatusItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await statusService.deleteStatus(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
