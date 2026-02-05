import { 
  CedulaModel, 
  EstadoCuentaMovimientoModel, 
  PeriodoModel,
  TipoMovimientoEstadoCuentaModel
} from "../data/models/models";
import interDB from "../core/dbconfig/mariadb";

export class EstadoCuentaService {

  async generarEstadoCuenta(periodoId: number, usuarioId: number) {
    // 1. Validar Periodo
    const periodo = await PeriodoModel.findByPk(periodoId);
    if (!periodo) {
      throw new Error("El periodo especificado no existe.");
    }

    if (periodo.activo) {
      throw new Error("El periodo debe estar cerrado para generar el estado de cuenta.");
    }

    if (periodo.estadoCuentaGenerado) {
      throw new Error("El estado de cuenta ya ha sido generado para este periodo.");
    }

    // 2. Definir Tipo de Movimiento "SALDO_MENSUAL"
    const tipoNombre = 'SALDO_MENSUAL';
    const tipoMovimiento = await TipoMovimientoEstadoCuentaModel.findOne({ where: { nombre: tipoNombre } });
    if (!tipoMovimiento) {
      throw new Error(`El tipo de movimiento '${tipoNombre}' no existe.`);
    }

    const naturaleza = tipoMovimiento.naturaleza; // 1 (Deudora)

    // 3. Obtener Cédulas del Periodo
    const cedulas = await CedulaModel.findAll({
      where: { periodoId },
      include: [
        { association: "filial" },
        { association: "grupo" }
      ]
    });

    if (cedulas.length === 0) {
      throw new Error("No hay cédulas generadas para este periodo.");
    }

    const t = await interDB.transaction();

    try {
      // Calculate period end date (last day of the month)
      const fechaFinPeriodo = new Date(periodo.anio, periodo.mes, 0);

      const movimientosToCreate = cedulas.map(cedula => {
        return {
          fecha: fechaFinPeriodo, // Fecha fin del periodo
          tipoMovimientoId: tipoMovimiento.id,
          montoMXNAbs: Math.abs(Number(cedula.totalFinal)),
          montoUSDAbs: Math.abs(Number(cedula.totalUsa)),
          montoMXN: Number(cedula.totalFinal),
          montoUSD: Number(cedula.totalUsa),
          periodoId: periodo.id,
          cedulaId: cedula.id,
          grupoId: cedula.grupoId,
          filialId: cedula.filialId,
          sucursalId: null, // Cédula es por filial
          grupoNombre: cedula.grupo?.nombre,
          filialNombre: cedula.filial?.nombre,
          sucursalNombre: null,
          observacion: `GEC - Periodo ${periodo.mes} ${periodo.anio}`,
          referencia: `EC-${periodo.anio}-${periodo.mes}-${cedula.id}`,
          usuarioId: usuarioId
        };
      });

      await EstadoCuentaMovimientoModel.bulkCreate(movimientosToCreate, { transaction: t });

      await periodo.update({ estadoCuentaGenerado: true }, { transaction: t });

      await t.commit();

      return { 
        message: "Estado de cuenta generado exitosamente.", 
        totalMovimientos: movimientosToCreate.length 
      };

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getAllMovimientos() {
    return await EstadoCuentaMovimientoModel.findAll({
      include: [
        { association: "periodo" },
        { association: "filial" },
        { association: "grupo" },
        { association: "tipoMovimiento" }
      ],
      order: [['fecha', 'DESC']]
    });
  }
}
