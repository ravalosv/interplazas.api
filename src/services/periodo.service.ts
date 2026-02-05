import { PeriodoModel, CedulaModel, EstadoCuentaMovimientoModel } from "../data/models/models";
import { IPeriodo } from "../data/interfaces/periodo.interface";

export class PeriodoService {
  async getAll() {
    return await PeriodoModel.findAll({
      order: [["anio", "DESC"], ["mes", "DESC"]],
      include: [{ association: "cedulas", attributes: ["id"] }]
    });
  }

  async getByMesAnio(mes: number, anio: number) {
    return await PeriodoModel.findOne({
      where: { mes, anio }
    });
  }

  async create(mes: number, anio: number) {
    // Helper para nombre del mes en español
    const monthNames = [
      "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
      "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];
    const nombre = `${monthNames[mes - 1]} ${anio}`;
    
    const [periodo] = await PeriodoModel.findOrCreate({
      where: { mes, anio },
      defaults: {
        mes,
        anio,
        nombre,
        activo: true,
        estadoCuentaGenerado: false
      }
    });
    
    return periodo;
  }

  async cerrarPeriodo(id: number) {
    const periodo = await PeriodoModel.findByPk(id);
    if (!periodo) return null;
    return await periodo.update({ activo: false });
  }

  async abrirPeriodo(id: number) {
    const periodo = await PeriodoModel.findByPk(id);
    if (!periodo) return null;

    const t = await PeriodoModel.sequelize!.transaction();

    try {
      // Eliminar movimientos de estado de cuenta asociados al periodo
      await EstadoCuentaMovimientoModel.destroy({
        where: { periodoId: id },
        transaction: t
      });

      // Eliminar cédulas asociadas al abrir el periodo
      await CedulaModel.destroy({ 
        where: { periodoId: id },
        transaction: t
      });

      const updatedPeriodo = await periodo.update({ 
        activo: true,
        estadoCuentaGenerado: false
      }, { transaction: t });

      await t.commit();
      return updatedPeriodo;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
