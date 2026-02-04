import {
  CedulaModel,
  CedulaDetalleModel,
  PeriodoModel,
  ServicioModel,
  FilialModel,
  SettingsModel,
} from "../data/models/models";
import { Op } from "sequelize";

export class CedulaService {
  async crearCedulas(anio: number, mes: number) {
    // 1. Validar Periodo
    const periodo = await PeriodoModel.findOne({ where: { anio, mes } });
    if (!periodo) {
      throw new Error("El periodo especificado no existe.");
    }
    if (periodo.activo) {
      throw new Error("El periodo debe estar cerrado para generar cédulas.");
    }

    // 2. Validar Cédulas Existentes
    const existingCedulas = await CedulaModel.count({
      where: { periodoId: periodo.id },
    });
    if (existingCedulas > 0) {
      throw new Error(
        "Ya existen cédulas creadas para este periodo. Debe eliminarlas antes de volver a generarlas."
      );
    }

    // 3. Obtener configuración global (comisión PF)
    const settings = await SettingsModel.findOne();
    const comisionPFSetting = settings ? Number(settings.comisionPF || 0) : 0;

    // 4. Obtener Servicios
    const servicios = await ServicioModel.findAll({
      where: {
        PeriodoId: periodo.id,
        [Op.or]: [
          { exp_Motivo_De_No_Otorgado_Id: 6 },
          { exp_Motivo_De_No_Otorgado_Id: null },
        ],
      },
      include: [
        { association: "sucursalOtorgante" },
        { association: "sucursalOrigen" },
        { association: "concepto" },
      ],
    });

    if (servicios.length === 0) {
      return { message: "No hay servicios registrados en este periodo." };
    }

    // 5. Identificar Filiales Involucradas (a través de las sucursales)
    const filialIds = new Set<number>();
    servicios.forEach((s: any) => {
      const filialOtorganteId = s.sucursalOtorgante?.filialId;
      const filialOrigenId = s.sucursalOrigen?.filialId;
      if (filialOtorganteId != null) {
        filialIds.add(filialOtorganteId);
      }
      if (filialOrigenId != null) {
        filialIds.add(filialOrigenId);
      }
    });

    const filiales = await FilialModel.findAll({
      where: { id: { [Op.in]: Array.from(filialIds) } },
      include: [{ association: "grupo" }],
    });

    const filialesMap = new Map<number, FilialModel>();
    const foreignFilialIds = new Set<number>();
    
    filiales.forEach((f) => {
      filialesMap.set(f.id, f);
      if (f.extranjera) {
        foreignFilialIds.add(f.id);
      }
    });

    // 6. Generar Cédulas por Filial
    const results = [];

    for (const filialId of filialIds) {
      const filial = filialesMap.get(filialId);
      if (!filial) continue;

      let subTotalFavor = 0;
      let subTotalPagar = 0;

      const detallesToCreate: any[] = [];

      for (const servicio of servicios as any[]) {
        const sucursalOtorgante = servicio.sucursalOtorgante;
        const sucursalOrigen = servicio.sucursalOrigen;
        const filialOtorganteId = sucursalOtorgante?.filialId;
        const filialOrigenId = sucursalOrigen?.filialId;
        const sucursalOtorganteId = sucursalOtorgante?.id;
        const sucursalOrigenId = sucursalOrigen?.id;

        if (
          filialOtorganteId == null ||
          filialOrigenId == null ||
          sucursalOtorganteId == null ||
          sucursalOrigenId == null
        ) {
          continue;
        }

        // Ignorar servicios internos (misma filial origen y otorgante)
        if (filialOtorganteId === filialOrigenId) {
          continue;
        }

        let cobroGrupo = true;
        const filialOtorgante = filialesMap.get(filialOtorganteId);
        const filialOrigen = filialesMap.get(filialOrigenId);

        const grupoOtorgante = (filialOtorgante as any)?.grupo;
        const grupoOrigen = (filialOrigen as any)?.grupo;

        if (
          grupoOtorgante &&
          grupoOrigen &&
          grupoOtorgante.id === grupoOrigen.id &&
          grupoOtorgante.cobroEntreFiliales === false
        ) {
          cobroGrupo = false;
        }

        const isForeign =
          foreignFilialIds.has(filialOtorganteId) ||
          foreignFilialIds.has(filialOrigenId);

        const rawMonto = isForeign
          ? Number(servicio.concepto?.montoUSD || 0)
          : Number(servicio.concepto?.montoMXN || 0);

        const montoEnContrato = isForeign
          ? Number(servicio.concepto?.montoUSD || 0)
          : Number(servicio.concepto?.montoMXN || 0);

        // Servicios donde la filial es Otorgante -> tipo FAVOR
        if (filialOtorganteId === filialId) {
          let montoFavor = rawMonto;
          if (servicio.penalizado) {
            montoFavor = 0;
          } else if (!isForeign && !cobroGrupo) {
            montoFavor = 0;
          }

          if (!isForeign) {
            subTotalFavor += montoFavor;
          }

          detallesToCreate.push({
            servicioId: servicio.id,
            tipo: isForeign ? "USA" : "FAVOR",
            sucursalOrigenNombre: sucursalOrigen.nombre,
            monto: isForeign ? rawMonto : montoFavor,
            sucursalOrigenId: sucursalOrigenId,
            sucursalOtorganteId: sucursalOtorganteId,
            sucursalOtorganteNombre: sucursalOtorgante.nombre,
            titular: servicio.fo_Nombre_Titular,
            finado: servicio.fo_Nombre_Finado,
            contrato: servicio.fo_Contrato,
            fecha: servicio.fo_Fecha_Servicio,
            conceptoId: servicio.fo_Concepto_Id,
            conceptoNombre: servicio.concepto ? servicio.concepto.nombre : null,
            saldoPABS: Number(servicio.fori_Saldo_Contrato || 0),
            observacion: servicio.exp_Observaciones_cierre || null,
            saldoEfectivamenteCobrado: Number(
              servicio.fo_Contrato_Monto_Recuperado || 0
            ),
            penalizado: servicio.penalizado || false,
            esFilialesHermanas: !cobroGrupo,
            montoDevuelto: Number(servicio.fo_Monto_Devuelto || 0),
            aceptaConvenio: servicio.fori_Acepta_Convenio || false,
            montoEnContrato,
          });
        }

        // Servicios donde la filial es Origen -> tipo PAGAR
        if (filialOrigenId === filialId) {
          let montoPagar = rawMonto;
          if (!isForeign && !cobroGrupo) {
            montoPagar = 0;
          }
          // Penalized check removed for PAGAR

          if (!isForeign) {
            subTotalPagar += montoPagar;
          }

          detallesToCreate.push({
            servicioId: servicio.id,
            tipo: isForeign ? "USA" : "PAGAR",
            sucursalOrigenNombre: sucursalOrigen.nombre,
            monto: isForeign ? rawMonto : montoPagar,
            sucursalOrigenId: sucursalOrigenId,
            sucursalOtorganteId: sucursalOtorganteId,
            sucursalOtorganteNombre: sucursalOtorgante.nombre,
            titular: servicio.fo_Nombre_Titular,
            finado: servicio.fo_Nombre_Finado,
            contrato: servicio.fo_Contrato,
            fecha: servicio.fo_Fecha_Servicio,
            conceptoId: servicio.fo_Concepto_Id,
            conceptoNombre: servicio.concepto ? servicio.concepto.nombre : null,
            saldoPABS: Number(servicio.fori_Saldo_Contrato || 0),
            observacion: servicio.exp_Observaciones_cierre || null,
            saldoEfectivamenteCobrado: Number(
              servicio.fo_Contrato_Monto_Recuperado || 0
            ),
            penalizado: servicio.penalizado || false,
            esFilialesHermanas: !cobroGrupo,
            montoDevuelto: Number(servicio.fo_Monto_Devuelto || 0),
            aceptaConvenio: servicio.fori_Acepta_Convenio || false,
            montoEnContrato,
          });
        }
      }

      if (detallesToCreate.length > 0) {
        const totalUsa = detallesToCreate
          .filter((d) => d.tipo === "USA")
          .reduce((acc, d) => acc + Number(d.monto || 0), 0);
        const totalComisiones = subTotalFavor - subTotalPagar;

        const totalMontoContratoFavor = detallesToCreate
          .filter((d) => d.tipo === "FAVOR")
          .reduce((acc, d) => acc + Number(d.montoEnContrato || 0), 0);

        const comisionPFCalculada = totalMontoContratoFavor * comisionPFSetting;

        const saldosEfectivamenteCobradosFavor = detallesToCreate
          .filter((d) => d.tipo === "FAVOR")
          .reduce((acc, d) => acc + Number(d.saldoEfectivamenteCobrado || 0), 0);
        const saldosEfectivamenteCobradosPagar = detallesToCreate
          .filter((d) => d.tipo === "PAGAR")
          .reduce((acc, d) => acc + Number(d.saldoEfectivamenteCobrado || 0), 0);
        const saldosEfectivamenteCobradosTotal =
          saldosEfectivamenteCobradosPagar - saldosEfectivamenteCobradosFavor;
        //const totalComisiones = totalNeto
        const totalFinal = totalComisiones + saldosEfectivamenteCobradosTotal;

        const totalMontoContrato = detallesToCreate.reduce(
          (acc, d) => acc + Number(d.montoEnContrato || 0),
          0
        );

        console.log("Creando cédula para periodo:", periodo.nombre, "Sucursal:", filial.nombre);

        const cedula = await CedulaModel.create({
          periodoId: periodo.id,
          periodoNombre: periodo.nombre,
          filialId: filialId,
          filialNombre: filial.nombre,
          grupoId: (filial as any).grupo?.id,
          grupoNombre: (filial as any).grupo?.nombre,
          subTotalFavor: subTotalFavor,
          subTotalPagar: subTotalPagar,
          totalUsa: totalUsa,
          totalComisiones: totalComisiones,
          comisionPF: comisionPFCalculada,
          saldosEfectivamenteCobradosFavor,
          saldosEfectivamenteCobradosPagar,
          saldosEfectivamenteCobradosTotal,
          totalFinal,
          totalMontoContrato,
        });

        const detallesWithCedulaId = detallesToCreate.map((d) => ({
          ...d,
          cedulaId: cedula.id,
        }));

        await CedulaDetalleModel.bulkCreate(detallesWithCedulaId);
        results.push(cedula);
      }
    }

    return results;
  }

  async eliminarCedulas(anio: number, mes: number) {
      const periodo = await PeriodoModel.findOne({ where: { anio, mes } });
      if (!periodo) {
        throw new Error("El periodo especificado no existe.");
      }
      
      const count = await CedulaModel.destroy({
          where: { periodoId: periodo.id }
      });
      
      // Details are cascade deleted by database if configured, but Sequelize associations need `hooks: true` or manual delete if DB doesn't have ON DELETE CASCADE.
      // My migration has `onDelete: 'CASCADE'`, so DB handles it.
      
      return { message: `Se eliminaron ${count} cédulas del periodo.` };
  }

  async getCedulasByPeriodo(periodoId: number) {
    return await CedulaModel.findAll({
      where: { periodoId },
      include: [{ association: "filial" }],
      order: [
        ["filialId", "ASC"],
        ["id", "ASC"],
      ],
    });
  }

  async getCedulaById(id: number) {
    return await CedulaModel.findByPk(id, {
      include: [
        { association: "filial" },
        {
          association: "detalles",
          include: [
            { association: "servicio" },
            { association: "sucursalOrigen" },
            { association: "sucursalOtorgante" },
          ],
        },
      ],
    });
  }
}
