import { ServicioLogService } from "./servicio-log.service";
import { ServicioModel, PeriodoModel, ServicioObservacionModel, CedulaDetalleModel, EmailTemplatesModel, CanalComunicacionModel, SucursalModel, TipoDocumentoModel, StatusContratoModel, TipoServicioModel,
  ConceptoModel, EstadoCtaStatusModel, MotivoNoOtorgadoModel, UserModel } from "../data/models/models";
import { IServicio } from "../data/interfaces/servicios.interface";
import { Op } from "sequelize";
import * as fs from "fs";
import * as path from "path";
import { sendMail } from "../core/services/mail.service";

export class ServicioService {
  private logService = new ServicioLogService();

  private fieldLabels: Record<string, string> = {
    'canalComunicacionId': 'Canal de Comunicación',
    'fo_Sucursal_otorgante_Id': 'Sucursal Otorgante',
    'fo_Sucursal_Origen_Id': 'Sucursal Origen',
    'fo_Contrato': 'Contrato',
    'fo_Nombre_Titular': 'Nombre Titular',
    'fo_Nombre_Finado': 'Nombre Finado',
    'fo_Documento_Cliente_Id': 'Tipo Documento Cliente',
    'fo_Documento_Cliente_url': 'Documento Cliente',
    'fo_Monto_devuelto_documento_url': 'Documento Monto Devuelto',
    'fo_Monto_Devuelto': 'Monto Devuelto',
    'fo_Jefe_Turno_Nombre': 'Jefe de Turno',
    'fo_Jefe_Turno_Puesto': 'Puesto Jefe Turno',
    'fo_Jefe_Turno_WhatsApp': 'WhatsApp Jefe Turno',
    'fo_Fecha_Servicio': 'Fecha Servicio',
    'fori_Status_Contrato_Id': 'Status Contrato',
    'fori_Saldo_Contrato': 'Saldo Contrato',
    'fori_Acepta_Convenio': 'Acepta Convenio',
    'fori_Otorga_Info_Nombre': 'Otorga Info (Nombre)',
    'fori_Otorga_Info_Puesto': 'Otorga Info (Puesto)',
    'fori_Otorga_Info_Telefono': 'Otorga Info (Teléfono)',
    'fo_Contrato_Monto_Recuperado': 'Monto Recuperado',
    'fo_Contrato_Monto_Convenio': 'Monto Convenio',
    'fo_Tipo_Servicio_Id': 'Tipo Servicio',
    'fo_Concepto_Id': 'Concepto',
    'exp_Solicitud_Servicio_Status_id': 'Status Solicitud',
    'exp_Solicitud_Servicio_url': 'Solicitud Servicio',
    'exp_Comprobante_Pago_Status_Id': 'Status Comprobante Pago',
    'exp_Comprobante_Pago_url': 'Comprobante Pago',
    'exp_Convenio_Status_Id': 'Status Convenio',
    'exp_Convenio_url': 'Convenio',
    'exp_Enviado_Grupo_Whats': 'Enviado Grupo WhatsApp',
    'exp_Motivo_De_No_Otorgado_Id': 'Motivo No Otorgado',
    'exp_Expediente_Completo': 'Expediente Completo',
    'exp_Observaciones_cierre': 'Observaciones Cierre',
    'penalizado': 'Penalizado',
    'exp_ine_responsable_url': 'INE Responsable',
    'exp_comprobante_domicilio_resp_url': 'Comprobante Domicilio Resp',
    'exp_ine_aval_url': 'INE Aval',
    'fori_estado_cuenta_url': 'Estado de Cuenta',
    'PeriodoId': 'Periodo',
    'Usuario_CapturaId': 'Usuario Captura',
    'Fecha_Captura': 'Fecha Captura',
    'status': 'Status',
  };

  private getFriendlyName(key: string): string {
    return this.fieldLabels[key] || key;
  }

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

  async getLogs(servicioId: number) {
    return await this.logService.getLogsByServicioId(servicioId);
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
        { association: "logs", attributes: ["usuarioId"] },
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
        { association: "logs", attributes: ["usuarioId"] },
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
        { association: "logs", attributes: ["usuarioId"] },
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
    
    // Format details for log
    const detailsPromises = Object.entries(newData)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(async ([key, value]) => {
        let displayValue = value;
        if (this.isForeignKey(key)) {
            displayValue = await this.getFieldValueDescription(key, value);
        }
        return `${this.getFriendlyName(key)}: ${displayValue}`;
      });

    const details = (await Promise.all(detailsPromises)).join('\n');

    await this.logService.logAction(createdServicio.id, userId, "CREACION", `Servicio creado con los siguientes datos:\n${details}`);

    if (file) {
      const url = this.moveFile(file, createdServicio.id);
      await createdServicio.update({ fo_Documento_Cliente_url: url });
      // Reload to get the updated field
      return await createdServicio.reload();
    }

    return createdServicio;
  }

  async uploadDocument(id: number, fieldName: string, file: Express.Multer.File, userId: number) {
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

    await this.logService.logAction(id, userId, "SUBIDA_ARCHIVO", `Archivo subido: ${this.getFriendlyName(fieldName)}`);

    return servicio;
  }

  async deleteDocument(id: number, fieldName: string, userId: number) {
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
    
    await this.logService.logAction(id, userId, "ELIMINACION_ARCHIVO", `Archivo eliminado: ${this.getFriendlyName(fieldName)}`);

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

  async update(id: number, data: IServicio, userId: number) {
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

    // --- Detect Changes ---
    const changes: string[] = [];
    const fieldsToCheck = Object.keys(updateData) as (keyof typeof updateData)[];
    
    for (const key of fieldsToCheck) {
      const newValue = updateData[key];
      // @ts-ignore
      const oldValue = record[key];

      // Ignore undefined values in updateData (not sent in request)
      if (newValue === undefined) continue;

      if (this.hasValueChanged(oldValue, newValue)) {
         let valOld = oldValue;
         let valNew = newValue;
         
         if (this.isForeignKey(key)) {
             valOld = await this.getFieldValueDescription(key, oldValue);
             valNew = await this.getFieldValueDescription(key, newValue);
         }

         changes.push(`${this.getFriendlyName(key)}: "${valOld}" -> "${valNew}"`);
      }
    }
    
    const updatePayload: Partial<IServicio> = {
      ...updateData,
      penalizado: newPenalizado,
    };

    if (contrato) {
      updatePayload.fo_Contrato = contrato;
    }

    const updatedRecord = await record.update(updatePayload);

    if (changes.length > 0) {
      // Log changes
      await this.logService.logAction(id, userId, "ACTUALIZACION", changes.join('\n'));
    }

    return updatedRecord;
  }

  private hasValueChanged(oldValue: any, newValue: any): boolean {
    // 1. Handle strict equality first (fast path)
    if (oldValue === newValue) return false;
    
    // 2. Handle null/undefined/empty string nuances
    // Treat null and undefined as equivalent for "no value"
    const isOldEmpty = oldValue === null || oldValue === undefined;
    const isNewEmpty = newValue === null || newValue === undefined;
    
    if (isOldEmpty && isNewEmpty) return false;
    
    // If one is empty and other is "" (empty string), decide if that's a change.
    // Usually DB null vs Form "" is a change from "nothing" to "explicit empty string", 
    // BUT often they mean the same "no value".
    // Let's treat null == "" as NO CHANGE to avoid noise, unless specific requirement.
    // User asked "only register fields that had change". 
    // If DB has null, and user sends "", it looks like no change in UI.
    if (isOldEmpty && newValue === "") return false;
    if (oldValue === "" && isNewEmpty) return false;

    // 3. Handle Dates
    if (oldValue instanceof Date) {
      if (!newValue) return true; // Date to null/empty -> Changed

      // Try to parse newValue
      const dNew = new Date(newValue);
      
      // Invalid date string?
      if (isNaN(dNew.getTime())) {
         // If newValue is not a valid date, but oldValue was a date, they are different.
         // But maybe newValue is a string that Date() failed to parse but matches?
         // Let's rely on loose equality if Date parse fails? No, loose equality with object is bad.
         return oldValue.toString() !== newValue; 
      }

      // If newValue looks like YYYY-MM-DD (DATEONLY), compare just the date part
      if (typeof newValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(newValue)) {
        // Construct YYYY-MM-DD from oldValue (which might include time if it's not DATEONLY)
        // But assuming UTC or consistent timezone handling is tricky.
        // Best bet: Format oldValue to YYYY-MM-DD and compare.
        const ymdOld = oldValue.toISOString().split('T')[0];
        return ymdOld !== newValue;
      }

      // Otherwise compare timestamps
      return oldValue.getTime() !== dNew.getTime();
    }

    // 4. Handle Booleans vs Strings ("true", "1", 1)
    if (typeof oldValue === 'boolean') {
        if (newValue === 'true' || newValue === '1' || newValue === 1) return !oldValue;
        if (newValue === 'false' || newValue === '0' || newValue === 0) return oldValue;
    }

    // 5. Handle Numbers vs Strings
    // 1 vs "1"
    if (typeof oldValue === 'number' && typeof newValue === 'string') {
        return oldValue !== Number(newValue);
    }

    // Default fallback
    return oldValue != newValue;
  }

  async updatePenalizadoStatus(id: number, penalizado: boolean, userId: number) {
    const record = await ServicioModel.findByPk(id);
    if (!record) return null;
    await record.update({ penalizado });
    await this.logService.logAction(id, userId, "CAMBIO_PENALIZACION", `Penalizado: ${penalizado}`);
    return record;
  }

  async changePeriod(id: number, newPeriodoId: number, userId: number) {
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

    await servicio.update({
      PeriodoId: newPeriodo.id,
      penalizado
    });
    
    await this.logService.logAction(id, userId, "CAMBIO_PERIODO", `Periodo cambiado a: "${newPeriodo.nombre}". Penalizado recalculado: ${penalizado}`);

    return servicio;
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

  private isForeignKey(key: string): boolean {
    const fkFields = [
      'canalComunicacionId',
      'fo_Sucursal_otorgante_Id',
      'fo_Sucursal_Origen_Id',
      'fo_Documento_Cliente_Id',
      'fori_Status_Contrato_Id',
      'fo_Tipo_Servicio_Id',
      'fo_Concepto_Id',
      'exp_Solicitud_Servicio_Status_id',
      'exp_Comprobante_Pago_Status_Id',
      'exp_Convenio_Status_Id',
      'exp_Motivo_De_No_Otorgado_Id',
      'PeriodoId',
      'Usuario_CapturaId'
    ];
    return fkFields.includes(key);
  }

  private async getFieldValueDescription(key: string, value: any): Promise<string> {
    if (value === null || value === undefined || value === '') return "";

    const id = Number(value);
    if (isNaN(id)) return String(value);

    try {
      switch (key) {
        case 'canalComunicacionId': {
          const m = await CanalComunicacionModel.findByPk(id);
          return m ? m.nombre : String(value);
        }
        case 'fo_Sucursal_otorgante_Id':
        case 'fo_Sucursal_Origen_Id': {
          const m = await SucursalModel.findByPk(id);
          return m ? m.nombre : String(value);
        }
        case 'fo_Documento_Cliente_Id': {
          const m = await TipoDocumentoModel.findByPk(id);
          return m ? m.nombre : String(value);
        }
        case 'fori_Status_Contrato_Id': {
          const m = await StatusContratoModel.findByPk(id);
          return m ? m.nombre : String(value);
        }
        case 'fo_Tipo_Servicio_Id': {
          const m = await TipoServicioModel.findByPk(id);
          return m ? m.nombre : String(value);
        }
        case 'fo_Concepto_Id': {
          const m = await ConceptoModel.findByPk(id);
          return m ? m.nombre : String(value);
        }
        case 'exp_Solicitud_Servicio_Status_id':
        case 'exp_Comprobante_Pago_Status_Id':
        case 'exp_Convenio_Status_Id': {
          const m = await EstadoCtaStatusModel.findByPk(id);
          return m ? m.nombre : String(value);
        }
        case 'exp_Motivo_De_No_Otorgado_Id': {
          const m = await MotivoNoOtorgadoModel.findByPk(id);
          return m ? m.nombre : String(value);
        }
        case 'PeriodoId': {
          const m = await PeriodoModel.findByPk(id);
          return m ? m.nombre : String(value);
        }
        case 'Usuario_CapturaId': {
          const m = await UserModel.findByPk(id);
          return m ? m.name : String(value);
        }
        default:
          return String(value);
      }
    } catch (e) {
      return String(value);
    }
  }
}
