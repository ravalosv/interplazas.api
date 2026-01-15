import nodemailer from "nodemailer";

type MailTemplateTags = Record<string, string | number | boolean>;

export interface MailAttachment {
  filename: string;
  path: string;
  contentType?: string;
}

export interface SendMailOptions {
  to: string | string[];
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

if (!smtpHost || !smtpUser || !smtpPass) {
  console.warn("Mail service is not fully configured. Missing MAIL_HOST, MAIL_USER or MAIL_PASS.");
}

function applyTemplate(template: string, tags?: MailTemplateTags): string {
  if (!tags) return template;
  return Object.keys(tags).reduce((acc, key) => {
    const value = String(tags[key]);
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    return acc.replace(regex, value);
  }, template);
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

  const htmlBody = applyTemplate(options.template, options.tags);

  const mailOptions = {
    from: defaultFrom,
    to: options.to,
    subject: options.subject,
    html: htmlBody,
    attachments: options.attachments,
  };

  await transporter.sendMail(mailOptions);
}

