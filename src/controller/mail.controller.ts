import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import { sendMail, MailAttachment } from "../core/services/mail.service";

export const sendMailController = async (req: Request, res: Response) => {
  try {
    const { to, subject, template, tags } = req.body;

    if (!to || !subject || !template) {
      const ret: ApiReturnPayload = { success: false, error: "MISSING_REQUIRED_FIELDS" };
      return res.send(ret);
    }

    let parsedTo: string | string[] = to;
    if (typeof to === "string") {
      try {
        if (to.trim().startsWith("[") && to.trim().endsWith("]")) {
          parsedTo = JSON.parse(to);
        } else if (to.includes(",")) {
          parsedTo = to.split(",").map((x) => x.trim()).filter((x) => x.length > 0);
        }
      } catch {
        parsedTo = to;
      }
    }

    let parsedTags: Record<string, string | number | boolean> | undefined;
    if (tags) {
      if (typeof tags === "string") {
        try {
          parsedTags = JSON.parse(tags);
        } catch {
          parsedTags = undefined;
        }
      } else {
        parsedTags = tags;
      }
    }

    const files = req.files as Express.Multer.File[] | undefined;
    let attachments: MailAttachment[] | undefined;

    if (files && files.length > 0) {
      attachments = files.map((file) => ({
        filename: file.originalname,
        path: file.path,
        contentType: file.mimetype,
      }));
    }

    await sendMail({
      to: parsedTo,
      subject,
      template,
      tags: parsedTags,
      attachments,
    });

    const ret: ApiReturnPayload = { success: true, data: { sent: true } };
    return res.send(ret);
  } catch (error: any) {
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};

