import { ServicioModel, PeriodoModel, ServicioObservacionModel, CedulaDetalleModel, EmailTemplatesModel } from "../data/models/models";
import { IServicio } from "../data/interfaces/servicios.interface";
import { Op } from "sequelize";
import * as fs from "fs";
import * as path from "path";
import { sendMail } from "../core/services/mail.service";

export class ServicioService {
  private calculatePenalizado(fechaServicio: string | Date, referenceDate: Date = new Date()): boolean {
    // Si viene como string 'YYYY-MM-DD' (DATEONLY), lo parseamos manualmente para evitar UTC shift
    let serviceDate: Date;
    
    if (typeof fechaServicio === 'string' && fechaServicio.includes('-')) {
      // Asumimos formato YYYY-MM-DD
      const [year, month, day] = fechaServicio.split('-').map(Number);
      // new Date(year, monthIndex, day) crea fecha en hora local
      serviceDate = new Date(year, month - 1, day);
    } else {
      serviceDate = new Date(fechaServicio);
    }

    const currentDate = referenceDate;

    const serviceYear = serviceDate.getFullYear();
    const serviceMonth = serviceDate.getMonth();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    if (serviceYear < currentYear) return true;
    if (serviceYear === currentYear && serviceMonth < currentMonth) return true;
    
    return false;
  }

  async getAll() {
    return await ServicioModel.findAll({
      order: [["fo_Fecha_Servicio", "DESC"]],
      include: [
        { association: "sucursalOtorgante" },
        { association: "sucursalOrigen" },
        { association: "tipoDocumento" },
        { association: "statusContrato" },
        { association: "tipoServicio" },
        { association: "concepto" },
        { association: "solicitudServicioStatus" },
        { association: "comprobantePagoStatus" },
        { association: "convenioStatus" },
        { association: "motivoNoOtorgado" },
        { association: "usuarioCaptura", attributes: ["id", "name", "email"] },
        { association: "periodo" },
      ],
    });
  }

  async getByMonthYear(month: number, year: number) {
    // Buscar el periodo correspondiente
    const periodo = await PeriodoModel.findOne({
      where: { mes: month, anio: year }
    });

    // Si no existe el periodo, no hay servicios para esa fecha
    if (!periodo) {
      return [];
    }

    return await ServicioModel.findAll({
      where: {
        PeriodoId: periodo.id
      },
      order: [["fo_Fecha_Servicio", "DESC"]],
      include: [
        { association: "sucursalOtorgante" },
        { association: "sucursalOrigen" },
        { association: "tipoDocumento" },
        { association: "statusContrato" },
        { association: "tipoServicio" },
        { association: "concepto" },
        { association: "solicitudServicioStatus" },
        { association: "comprobantePagoStatus" },
        { association: "convenioStatus" },
        { association: "motivoNoOtorgado" },
        { association: "usuarioCaptura", attributes: ["id", "name", "email"] },
        { association: "periodo" },
      ],
    });
  }

  async getByPeriodoId(periodoId: number) {
    return await ServicioModel.findAll({
      where: {
        PeriodoId: periodoId,
      },
      order: [["fo_Fecha_Servicio", "DESC"]],
      include: [
        { association: "sucursalOtorgante" },
        { association: "sucursalOrigen" },
        { association: "tipoDocumento" },
        { association: "statusContrato" },
        { association: "tipoServicio" },
        { association: "concepto" },
        { association: "solicitudServicioStatus" },
        { association: "comprobantePagoStatus" },
        { association: "convenioStatus" },
        { association: "motivoNoOtorgado" },
        { association: "usuarioCaptura", attributes: ["id", "name", "email"] },
        { association: "periodo" },
      ],
    });
  }

  async create(data: Omit<IServicio, "id" | "Usuario_CapturaId" | "Fecha_Captura" | "penalizado" | "PeriodoId">, userId: number, file?: Express.Multer.File) {
    const contratoRaw = data.fo_Contrato || "";
    const contrato = contratoRaw.trim();

    if (contrato) {
      const existing = await ServicioModel.findOne({
        where: { fo_Contrato: contrato },
      });

      if (existing) {
        throw new Error("El número de contrato ya ha sido utilizado en otro servicio.");
      }
    }

    const penalizado = this.calculatePenalizado(data.fo_Fecha_Servicio);
    
    // Calcular Periodo basado en fecha actual (Fecha_Captura)
    const fechaCaptura = new Date();
    const mes = fechaCaptura.getMonth() + 1; // 0-indexed
    const anio = fechaCaptura.getFullYear();
    const nombrePeriodo = `${new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fechaCaptura).toUpperCase()} ${anio}`;

    const [periodo] = await PeriodoModel.findOrCreate({
      where: { mes, anio },
      defaults: {
        mes,
        anio,
        nombre: nombrePeriodo,
        activo: true,
        estadoCuentaGenerado: false
      }
    });

    if (!periodo.activo) {
      throw new Error("El periodo correspondiente a la fecha actual está cerrado.");
    }

    const newData: IServicio = {
      ...data,
      fo_Contrato: contrato || data.fo_Contrato,
      Usuario_CapturaId: userId,
      Fecha_Captura: fechaCaptura,
      penalizado,
      PeriodoId: periodo.id
    };

    const createdServicio = await ServicioModel.create(newData);

    if (file) {
      const url = this.moveFile(file, createdServicio.id);
      await createdServicio.update({ fo_Documento_Cliente_url: url });
      // Reload to get the updated field
      return await createdServicio.reload();
    }

    return createdServicio;
  }

  async uploadDocument(id: number, fieldName: string, file: Express.Multer.File) {
    const servicio = await ServicioModel.findByPk(id, { include: ["periodo"] });
    if (!servicio) throw new Error("Servicio no encontrado");

    // @ts-ignore
    if (servicio.periodo && !servicio.periodo.activo) {
      throw new Error("No se puede modificar un servicio de un periodo cerrado.");
    }

    // Remove old file if exists
    // @ts-ignore
    const oldPath = servicio[fieldName];
    if (oldPath) {
      this.removeFile(oldPath);
    }

    const url = this.moveFile(file, id);
    // @ts-ignore
    await servicio.update({ [fieldName]: url });

    return servicio;
  }

  async deleteDocument(id: number, fieldName: string) {
    const servicio = await ServicioModel.findByPk(id, { include: ["periodo"] });
    if (!servicio) throw new Error("Servicio no encontrado");

    // @ts-ignore
    if (servicio.periodo && !servicio.periodo.activo) {
      throw new Error("No se puede modificar un servicio de un periodo cerrado.");
    }

    // @ts-ignore
    const oldPath = servicio[fieldName];
    if (oldPath) {
      this.removeFile(oldPath);
    }

    // @ts-ignore
    await servicio.update({ [fieldName]: null });
    return true;
  }

  private moveFile(file: Express.Multer.File, serviceId: number): string {
    const storagePath = path.join(process.cwd(), "storage", "servicios", serviceId.toString());
    
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath, { recursive: true });
    }

    const ext = file.originalname.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const newPath = path.join(storagePath, fileName);

    fs.renameSync(file.path, newPath);

    return `servicios/${serviceId}/${fileName}`; // Relative URL for frontend
  }

  private removeFile(relativePath: string) {
    const fullPath = path.join(process.cwd(), "storage", relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  async getById(id: number) {
    return await ServicioModel.findByPk(id, {
      include: [
        { association: "sucursalOtorgante" },
        { association: "sucursalOrigen" },
        { association: "tipoDocumento" },
        { association: "statusContrato" },
        { association: "tipoServicio" },
        { association: "concepto" },
        { association: "solicitudServicioStatus" },
        { association: "comprobantePagoStatus" },
        { association: "convenioStatus" },
        { association: "motivoNoOtorgado" },
        { association: "usuarioCaptura", attributes: ["id", "name", "email"] },
        { association: "periodo" },
      ],
    });
  }

  async update(id: number, data: IServicio) {
    const record = await ServicioModel.findByPk(id, { include: ["periodo"] });
    if (!record) return null;

    // @ts-ignore
    if (record.periodo && !record.periodo.activo) {
      throw new Error("No se puede actualizar un servicio de un periodo cerrado.");
    }
    
    const { Usuario_CapturaId, Fecha_Captura, penalizado, ...updateData } = data;

    const contratoRaw = updateData.fo_Contrato || "";
    const contrato = contratoRaw.trim();

    if (contrato) {
      const existing = await ServicioModel.findOne({
        where: {
          fo_Contrato: contrato,
          id: { [Op.ne]: id },
        },
      });

      if (existing) {
        throw new Error("El número de contrato ya ha sido utilizado en otro servicio.");
      }
    }
    
    // Si se actualiza la fecha del servicio, recalcular penalizado
    let newPenalizado = record.penalizado;
    if (updateData.fo_Fecha_Servicio) {
      newPenalizado = this.calculatePenalizado(updateData.fo_Fecha_Servicio);
    }
    
    const updatePayload: Partial<IServicio> = {
      ...updateData,
      penalizado: newPenalizado,
    };

    if (contrato) {
      updatePayload.fo_Contrato = contrato;
    }

    return await record.update(updatePayload);
  }

  async updatePenalizadoStatus(id: number, penalizado: boolean) {
    const record = await ServicioModel.findByPk(id);
    if (!record) return null;
    return await record.update({ penalizado });
  }

  async changePeriod(id: number, newPeriodoId: number) {
    const servicio = await ServicioModel.findByPk(id, { include: ["periodo"] });
    if (!servicio) throw new Error("Servicio no encontrado");

    // @ts-ignore
    if (servicio.periodo && !servicio.periodo.activo) {
      throw new Error("El periodo actual del servicio está cerrado.");
    }

    const newPeriodo = await PeriodoModel.findByPk(newPeriodoId);
    if (!newPeriodo) throw new Error("Periodo destino no encontrado");
    if (!newPeriodo.activo) throw new Error("El periodo destino está cerrado.");

    // @ts-ignore
    if (servicio.PeriodoId === newPeriodo.id) {
      throw new Error("El periodo destino no puede ser el mismo que el actual.");
    }

    // Calculate penalized based on new period
    // Create reference date from newPeriodo (use 1st day of the month)
    const referenceDate = new Date(newPeriodo.anio, newPeriodo.mes - 1, 1);
    
    const penalizado = this.calculatePenalizado(servicio.fo_Fecha_Servicio, referenceDate);

    return await servicio.update({
      PeriodoId: newPeriodo.id,
      penalizado
    });
  }

  async delete(id: number) {
    const record = await ServicioModel.findByPk(id, { include: ["periodo"] });
    if (!record) return null;

    // @ts-ignore
    if (record.periodo && !record.periodo.activo) {
      throw new Error("No se puede eliminar un servicio de un periodo cerrado.");
    }

    const t = await ServicioModel.sequelize!.transaction();

    try {
      // Delete related observations
      await ServicioObservacionModel.destroy({
        where: { servicioId: id },
        transaction: t
      });

      // Delete related cedula details
      await CedulaDetalleModel.destroy({
        where: { servicioId: id },
        transaction: t
      });

      // Delete the service
      await record.destroy({ transaction: t });

      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async sendExpedienteEmail(id: number) {
    const servicio: any = await ServicioModel.findByPk(id, {
      include: [
        { association: "sucursalOrigen", include: [{ association: "filial" }] },
        { association: "sucursalOtorgante", include: [{ association: "filial" }] },
      ],
    });
    if (!servicio) throw new Error("Servicio no encontrado");

    const filialOrigen = servicio.sucursalOrigen?.filial;
    const filialOtorgante = servicio.sucursalOtorgante?.filial;
    if (!filialOrigen) throw new Error("FILIAL_ORIGEN_NOT_FOUND");

    const saldo: number = Number(servicio.fori_Saldo_Contrato || 0);
    const aceptaConvenio: boolean = Boolean(servicio.fori_Acepta_Convenio);
    const montoRecuperado: number = Number(servicio.fo_Contrato_Monto_Recuperado || 0);

    let templateId: number | null = null;
    if (saldo === 0) {
      templateId = filialOrigen.templateSaldoPabsCero ?? null;
    } else {
      if (saldo >= 1 && aceptaConvenio && montoRecuperado > 0) {
        templateId = filialOrigen.templateSaldoPabsParcial ?? null;
      } else if (saldo >= 1 && aceptaConvenio) {
        templateId = filialOrigen.templateSaldoPabsConConvenio ?? null;
      } else if (saldo >= 1 && !aceptaConvenio) {
        templateId = filialOrigen.templateSaldoPabsSinConvenio ?? null;
      }
    }

    if (!templateId) throw new Error("EMAIL_TEMPLATE_NOT_CONFIGURED");

    const template = await EmailTemplatesModel.findByPk(templateId);
    if (!template) throw new Error("EMAIL_TEMPLATE_NOT_FOUND");

    const tags = {
      filial_origen: filialOrigen?.nombre || "",
      filial_otorgante: filialOtorgante?.nombre || "",
      contrato: servicio.fo_Contrato || "",
    } as Record<string, string>;

    const applySubjectTags = (str: string): string => {
      return Object.keys(tags).reduce((acc, key) => {
        const val = tags[key] || "";
        return acc
          .replace(new RegExp(`\\{\\s*${key}\\s*\\}`, 'g'), val)
          .replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'), val);
      }, str || "");
    };

    const subject = applySubjectTags((template as any).titulo || "");

    const parseEmails = (s?: string | null): string[] => {
      if (!s) return [];
      return s
        .split(',')
        .map((x) => x.trim())
        .filter((x) => x.length > 0);
    };

    const to = parseEmails(filialOrigen?.destinatarios_email);
    const cc = parseEmails(filialOtorgante?.destinatarios_email);
    if (!to.length) throw new Error("RECIPIENTS_MISSING");

    const attachmentFields = [
      'exp_Solicitud_Servicio_url',
      'exp_Comprobante_Pago_url',
      'exp_Convenio_url',
      'fo_Documento_Cliente_url',
      'fo_Monto_devuelto_documento_url',
      'exp_ine_responsable_url',
      'exp_comprobante_domicilio_resp_url',
      'exp_ine_aval_url',
      'fori_estado_cuenta_url',
    ];

    const attachments = attachmentFields
      .map((field) => servicio[field])
      .filter((relPath: string | null | undefined) => !!relPath)
      .map((relPath: string) => path.join(process.cwd(), 'storage', relPath))
      .filter((fullPath: string) => fs.existsSync(fullPath))
      .map((fullPath: string) => ({ filename: path.basename(fullPath), path: fullPath }));

    await sendMail({
      to,
      cc: cc.length ? cc : undefined,
      subject,
      template: (template as any).template,
      tags,
      attachments,
    });

    return { sent: true };
  }
}
