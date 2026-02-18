import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

type MailTemplateTags = Record<string, string | number | boolean>;

export interface MailAttachment {
  filename: string;
  path: string;
  contentType?: string;
}

export interface SendMailOptions {
  to: string | string[];
  cc?: string | string[];
  subject: string;
  template: string;
  tags?: MailTemplateTags;
  attachments?: MailAttachment[];
}

const smtpHost = process.env.MAIL_HOST;
const smtpPort = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587;
const smtpUser = process.env.MAIL_USER;
const smtpPass = process.env.MAIL_PASS;
const smtpSecure = process.env.MAIL_SECURE === "true";
const defaultFrom = process.env.MAIL_FROM || smtpUser || "";
const templatesBasePath = process.env.MAIL_TEMPLATES_PATH || path.join(process.cwd(), "storage", "email_templates");

if (!smtpHost || !smtpUser || !smtpPass) {
  console.warn("Mail service is not fully configured. Missing MAIL_HOST, MAIL_USER or MAIL_PASS.");
}

function applyTemplate(template: string, tags?: MailTemplateTags): string {
  if (!tags) return template;
  return Object.keys(tags).reduce((acc, key) => {
    const value = String(tags[key]);
    return acc
      .replace(new RegExp(`\\{\\s*${key}\\s*\\}`, "g"), value)
      .replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value);
  }, template);
}

async function loadTemplateFromFile(template: string): Promise<string> {
  const fileName = template.endsWith(".html") ? template : `${template}.html`;
  const resolvedPath = path.join(templatesBasePath, fileName);
  const normalizedBase = path.resolve(templatesBasePath);
  const normalizedPath = path.resolve(resolvedPath);

  if (!normalizedPath.startsWith(normalizedBase)) {
    throw new Error("INVALID_TEMPLATE_PATH");
  }

  try {
    const content = await fs.promises.readFile(normalizedPath, "utf8");
    return content;
  } catch {
    throw new Error("TEMPLATE_NOT_FOUND");
  }
}

export async function sendMail(options: SendMailOptions): Promise<void> {
  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error("MAIL_CONFIG_INCOMPLETE");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const rawTemplate = await loadTemplateFromFile(options.template);
  const htmlBody = applyTemplate(rawTemplate, options.tags);

  const mailOptions: any = {
    from: defaultFrom,
    to: options.to,
    subject: options.subject,
    html: htmlBody,
    attachments: options.attachments,
  };

  if (options.cc && (Array.isArray(options.cc) ? options.cc.length : String(options.cc).trim().length)) {
    mailOptions.cc = options.cc;
  }

  await transporter.sendMail(mailOptions);
}

