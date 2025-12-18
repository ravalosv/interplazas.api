import { PeriodoModel } from "../data/models/models";
import { IPeriodo } from "../data/interfaces/periodo.interface";

export class PeriodoService {
  async getAll() {
    return await PeriodoModel.findAll({
      order: [["anio", "DESC"], ["mes", "DESC"]]
    });
  }

  async getByMesAnio(mes: number, anio: number) {
    return await PeriodoModel.findOne({
      where: { mes, anio }
    });
  }

  async cerrarPeriodo(id: number) {
    const periodo = await PeriodoModel.findByPk(id);
    if (!periodo) return null;
    return await periodo.update({ activo: false });
  }

  async abrirPeriodo(id: number) {
    const periodo = await PeriodoModel.findByPk(id);
    if (!periodo) return null;
    return await periodo.update({ activo: true });
  }
}
