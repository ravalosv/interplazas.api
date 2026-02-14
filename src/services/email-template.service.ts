import { EmailTemplatesModel } from "../data/models/models";
import { IEmailTemplate } from "../data/interfaces/email-template.interface";

export class EmailTemplateService {
  async getAll(): Promise<IEmailTemplate[]> {
    const templates = await EmailTemplatesModel.findAll();
    return templates;
  }
}
