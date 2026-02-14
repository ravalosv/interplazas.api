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

export { getItems };
