import { 
  CedulaModel, 
  EstadoCuentaMovimientoModel, 
  PeriodoModel,
  TipoMovimientoEstadoCuentaModel,
  GrupoModel,
  FilialModel,
  SucursalModel
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

  async getTiposMovimiento() {
    return await TipoMovimientoEstadoCuentaModel.findAll();
  }

  async createMovimiento(data: any, usuarioId: number) {
    const {
      fecha,
      tipoMovimientoId,
      montoMXN,
      montoUSD,
      periodoId,
      grupoId,
      filialId,
      sucursalId,
      observacion,
      referencia
    } = data;

    const tipoMovimiento = await TipoMovimientoEstadoCuentaModel.findByPk(tipoMovimientoId);
    if (!tipoMovimiento) {
      throw new Error("Tipo de movimiento inválido.");
    }

    if (tipoMovimiento.nombre === 'SALDO_MENSUAL') {
      throw new Error("No se permite crear movimientos manuales de tipo SALDO_MENSUAL.");
    }

    let grupoNombre = null;
    let filialNombre = null;
    let sucursalNombre = null;

    if (grupoId) {
        const grupo = await GrupoModel.findByPk(grupoId);
        if (grupo) grupoNombre = grupo.nombre;
    }
    if (filialId) {
        const filial = await FilialModel.findByPk(filialId);
        if (filial) filialNombre = filial.nombre;
    }
    if (sucursalId) {
        const sucursal = await SucursalModel.findByPk(sucursalId);
        if (sucursal) sucursalNombre = sucursal.nombre;
    }

    const montoMXNAbs = Math.abs(Number(montoMXN || 0));
    const montoUSDAbs = Math.abs(Number(montoUSD || 0));

    const finalObservacion = observacion && observacion.trim() !== '' ? observacion : tipoMovimiento.nombre;

    let finalMontoMXN = 0;
    let finalMontoUSD = 0;

    if (tipoMovimiento.nombre === 'SALDO_INICIAL') {
        finalMontoMXN = Number(montoMXN || 0);
        finalMontoUSD = Number(montoUSD || 0);
    } else {
        finalMontoMXN = montoMXN * tipoMovimiento.naturaleza;
        finalMontoUSD = montoUSD * tipoMovimiento.naturaleza;
    }

    return await EstadoCuentaMovimientoModel.create({
      fecha,
      tipoMovimientoId,
      montoMXNAbs,
      montoUSDAbs,
      montoMXN: finalMontoMXN,
      montoUSD: finalMontoUSD,
      periodoId,
      grupoId,
      filialId,
      sucursalId,
      grupoNombre,
      filialNombre,
      sucursalNombre,
      observacion: finalObservacion,
      referencia,
      usuarioId
    });
  }

  async updateMovimiento(id: number, data: any, usuarioId: number) {
    const movimiento = await EstadoCuentaMovimientoModel.findByPk(id);
    if (!movimiento) {
      throw new Error("Movimiento no encontrado.");
    }

    const {
      fecha,
      tipoMovimientoId,
      montoMXN,
      montoUSD,
      periodoId,
      grupoId,
      filialId,
      sucursalId,
      observacion,
      referencia
    } = data;

    const tipoActual = movimiento.tipoMovimientoId
      ? await TipoMovimientoEstadoCuentaModel.findByPk(movimiento.tipoMovimientoId)
      : null;
    if (tipoActual && tipoActual.nombre === 'SALDO_MENSUAL') {
      throw new Error("Los movimientos de tipo SALDO_MENSUAL no se pueden editar.");
    }
    if (tipoMovimientoId) {
      const tipoNuevo = await TipoMovimientoEstadoCuentaModel.findByPk(tipoMovimientoId);
      if (tipoNuevo && tipoNuevo.nombre === 'SALDO_MENSUAL') {
        throw new Error("Los movimientos de tipo SALDO_MENSUAL no se pueden editar.");
      }
    }

    let grupoNombre = null;
    let filialNombre = null;
    let sucursalNombre = null;

    if (grupoId) {
      const grupo = await GrupoModel.findByPk(grupoId);
      if (grupo) grupoNombre = grupo.nombre;
    }
    if (filialId) {
      const filial = await FilialModel.findByPk(filialId);
      if (filial) filialNombre = filial.nombre;
    }
    if (sucursalId) {
      const sucursal = await SucursalModel.findByPk(sucursalId);
      if (sucursal) sucursalNombre = sucursal.nombre;
    }

    // Determine final observation
    let finalObservacion = observacion;
    let targetTipo = null;

    if (!finalObservacion || finalObservacion.trim() === '') {
        // Use existing type name if not changing type, or new type name if changing
        targetTipo = tipoMovimientoId 
            ? await TipoMovimientoEstadoCuentaModel.findByPk(tipoMovimientoId)
            : (movimiento.tipoMovimientoId ? await TipoMovimientoEstadoCuentaModel.findByPk(movimiento.tipoMovimientoId) : null);
            
        if (targetTipo) {
            finalObservacion = targetTipo.nombre;
        }
    }

    if (!targetTipo) {
         targetTipo = tipoMovimientoId 
            ? await TipoMovimientoEstadoCuentaModel.findByPk(tipoMovimientoId)
            : (movimiento.tipoMovimientoId ? await TipoMovimientoEstadoCuentaModel.findByPk(movimiento.tipoMovimientoId) : null);
    }

    const naturaleza = targetTipo ? targetTipo.naturaleza : 1;

    const montoMXNAbs = Math.abs(Number(montoMXN || 0));
    const montoUSDAbs = Math.abs(Number(montoUSD || 0));

    let finalMontoMXN = 0;
    let finalMontoUSD = 0;

    if (targetTipo && targetTipo.nombre === 'SALDO_INICIAL') {
        finalMontoMXN = Number(montoMXN || 0);
        finalMontoUSD = Number(montoUSD || 0);
    } else {
        finalMontoMXN = montoMXNAbs * naturaleza;
        finalMontoUSD = montoUSDAbs * naturaleza;
    }

    await movimiento.update({
      fecha,
      tipoMovimientoId,
      montoMXNAbs,
      montoUSDAbs,
      montoMXN: finalMontoMXN,
      montoUSD: finalMontoUSD,
      periodoId,
      grupoId,
      filialId,
      sucursalId,
      grupoNombre,
      filialNombre,
      sucursalNombre,
      observacion: finalObservacion,
      referencia,
      usuarioId
    });

    return movimiento;
  }
}
