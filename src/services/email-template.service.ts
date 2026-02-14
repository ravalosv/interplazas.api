import { EmailTemplatesModel } from "../data/models/models";
import { IEmailTemplate } from "../data/interfaces/email-template.interface";
import * as fs from 'fs';
import * as path from 'path';

export class EmailTemplateService {
  private storagePath = path.join(__dirname, '../../storage/email_templates');

  private getFilePath(filename: string): string {
    return path.join(this.storagePath, filename);
  }

  private async readFileContent(filename: string): Promise<string> {
    try {
      const filePath = this.getFilePath(filename);
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
      }
      return '';
    } catch (error) {
      console.error(`Error reading file ${filename}:`, error);
      return '';
    }
  }

  private async writeFileContent(filename: string, content: string): Promise<void> {
    try {
      if (!fs.existsSync(this.storagePath)) {
        fs.mkdirSync(this.storagePath, { recursive: true });
      }
      const filePath = this.getFilePath(filename);
      fs.writeFileSync(filePath, content, 'utf-8');
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
      throw new Error(`Could not save template file: ${filename}`);
    }
  }

  async getAll(): Promise<IEmailTemplate[]> {
    const templates = await EmailTemplatesModel.findAll();
    return templates;
  }

  async getById(id: number): Promise<IEmailTemplate | null> {
    const template = await EmailTemplatesModel.findByPk(id);
    if (template) {
      const content = await this.readFileContent(template.template);
      // We append the content to the object dynamically
      return { ...template.toJSON(), htmlContent: content } as IEmailTemplate;
    }
    return template;
  }

  async create(data: IEmailTemplate & { htmlContent?: string }): Promise<IEmailTemplate> {
    const template = await EmailTemplatesModel.create(data);
    
    if (data.htmlContent) {
      await this.writeFileContent(data.template, data.htmlContent);
    }

    return template;
  }

  async update(id: number, data: IEmailTemplate & { htmlContent?: string }): Promise<IEmailTemplate | null> {
    const template = await EmailTemplatesModel.findByPk(id);
    if (!template) {
      return null;
    }
    
    // If filename changed, maybe rename old file? For now, we just write to the new filename.
    await template.update(data);

    if (data.htmlContent !== undefined) {
      await this.writeFileContent(data.template, data.htmlContent);
    }

    return template;
  }

  async delete(id: number): Promise<boolean> {
    const template = await EmailTemplatesModel.findByPk(id);
    if (!template) {
      return false;
    }
    
    // Optional: Delete the file too? 
    // Usually safer to keep it or move to trash, but for CRUD we might want to delete it.
    // Let's check if file exists and delete it.
    const filePath = this.getFilePath(template.template);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.error('Error deleting file', e);
      }
    }

    await template.destroy();
    return true;
  }
}
