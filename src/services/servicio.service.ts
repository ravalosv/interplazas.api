import { ServicioModel, PeriodoModel } from "../data/models/models";
import { IServicio } from "../data/interfaces/servicios.interface";
import { Op } from "sequelize";
import * as fs from "fs";
import * as path from "path";

export class ServicioService {
  private calculatePenalizado(fechaServicio: string | Date): boolean {
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

    const currentDate = new Date();

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
        { association: "filialOtorgante" },
        { association: "filialOrigen" },
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
        { association: "filialOtorgante" },
        { association: "filialOrigen" },
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
        { association: "filialOtorgante" },
        { association: "filialOrigen" },
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
        activo: true
      }
    });

    if (!periodo.activo) {
      throw new Error("El periodo correspondiente a la fecha actual está cerrado.");
    }

    const newData: IServicio = {
      ...data,
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
    const servicio = await ServicioModel.findByPk(id);
    if (!servicio) throw new Error("Servicio no encontrado");

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
    const servicio = await ServicioModel.findByPk(id);
    if (!servicio) throw new Error("Servicio no encontrado");

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
        { association: "filialOtorgante" },
        { association: "filialOrigen" },
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
    
    // Evitar actualización de campos de auditoría y campo calculado penalizado
    const { Usuario_CapturaId, Fecha_Captura, penalizado, ...updateData } = data;
    
    // Si se actualiza la fecha del servicio, recalcular penalizado
    let newPenalizado = record.penalizado;
    if (updateData.fo_Fecha_Servicio) {
      newPenalizado = this.calculatePenalizado(updateData.fo_Fecha_Servicio);
    }
    
    return await record.update({ ...updateData, penalizado: newPenalizado });
  }

  async updatePenalizadoStatus(id: number, penalizado: boolean) {
    const record = await ServicioModel.findByPk(id);
    if (!record) return null;
    return await record.update({ penalizado });
  }

  async delete(id: number) {
    const record = await ServicioModel.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }
}
