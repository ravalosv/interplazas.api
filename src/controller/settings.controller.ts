import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as settingsService from "../services/settings.service";

export const getSettings = async (req: Request, res: Response) => {
  try {
    const data = await settingsService.getSettings();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const getSetting = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await settingsService.getSettingById(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const createSetting = async (req: Request, res: Response) => {
  try {
    const { comisionPF } = req.body;
    const data = await settingsService.createSetting({ comisionPF });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const updateSetting = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { comisionPF } = req.body;
    const data = await settingsService.updateSetting(id, { comisionPF });
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export const deleteSetting = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await settingsService.deleteSetting(id);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
