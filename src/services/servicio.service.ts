import { ServicioModel, PeriodoModel } from "../data/models/models";
import { IServicio } from "../data/interfaces/servicios.interface";
import { Op } from "sequelize";

export class ServicioService {
  private calculatePenalizado(fechaServicio: Date): boolean {
    const serviceDate = new Date(fechaServicio);
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
        { association: "tipoAtaud" },
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
        { association: "tipoAtaud" },
        { association: "solicitudServicioStatus" },
        { association: "comprobantePagoStatus" },
        { association: "convenioStatus" },
        { association: "motivoNoOtorgado" },
        { association: "usuarioCaptura", attributes: ["id", "name", "email"] },
        { association: "periodo" },
      ],
    });
  }

  async create(data: Omit<IServicio, "id" | "Usuario_CapturaId" | "Fecha_Captura" | "penalizado" | "PeriodoId">, userId: number) {
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
    return await ServicioModel.create(newData);
  }

  async getById(id: number) {
    return await ServicioModel.findByPk(id, {
      include: [
        { association: "filialOtorgante" },
        { association: "filialOrigen" },
        { association: "tipoDocumento" },
        { association: "statusContrato" },
        { association: "tipoServicio" },
        { association: "tipoAtaud" },
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
