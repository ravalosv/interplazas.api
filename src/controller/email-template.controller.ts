import { Request, Response } from "express";
import { EmailTemplateService } from "../services/email-template.service";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";

const service = new EmailTemplateService();

const getItems = async (req: Request, res: Response) => {
  try {
    const data = await service.getAll();
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await service.getById(Number(id));
    if (!data) {
      const ret: ApiReturnPayload = { success: false, error: "TEMPLATE_NOT_FOUND" };
      return res.status(404).send(ret);
    }
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

const createItem = async (req: Request, res: Response) => {
  try {
    const data = await service.create(req.body);
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await service.update(Number(id), req.body);
    if (!data) {
      const ret: ApiReturnPayload = { success: false, error: "TEMPLATE_NOT_FOUND" };
      return res.status(404).send(ret);
    }
    const ret: ApiReturnPayload = { success: true, data };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await service.delete(Number(id));
    if (!success) {
      const ret: ApiReturnPayload = { success: false, error: "TEMPLATE_NOT_FOUND" };
      return res.status(404).send(ret);
    }
    const ret: ApiReturnPayload = { success: true, data: success };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

export { getItems, getItem, createItem, updateItem, deleteItem };
