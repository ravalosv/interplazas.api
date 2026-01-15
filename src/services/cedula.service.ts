import {
  CedulaModel,
  CedulaDetalleModel,
  PeriodoModel,
  ServicioModel,
  FilialModel,
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

    // 3. Obtener Servicios
    const servicios = await ServicioModel.findAll({
      where: { PeriodoId: periodo.id },
      include: [
        { association: "filialOtorgante" },
        { association: "filialOrigen" },
      ],
    });

    if (servicios.length === 0) {
      return { message: "No hay servicios registrados en este periodo." };
    }

    // 4. Identificar Filiales Involucradas (a través de las sucursales)
    const filialIds = new Set<number>();
    servicios.forEach((s: any) => {
      const filialOtorganteId = s.filialOtorgante?.filialId;
      const filialOrigenId = s.filialOrigen?.filialId;
      if (filialOtorganteId != null) {
        filialIds.add(filialOtorganteId);
      }
      if (filialOrigenId != null) {
        filialIds.add(filialOrigenId);
      }
    });

    const filiales = await FilialModel.findAll({
      where: { id: { [Op.in]: Array.from(filialIds) } },
    });

    const filialesMap = new Map<number, FilialModel>();
    filiales.forEach((f) => filialesMap.set(f.id, f));

    // 5. Generar Cédulas por Filial
    const results = [];

    for (const filialId of filialIds) {
      const filial = filialesMap.get(filialId);
      if (!filial) continue;

      let favor = 0;
      let pagar = 0;
      let usaFavor = 0;
      let usaPagar = 0;

      const detallesToCreate: any[] = [];

      for (const servicio of servicios as any[]) {
        const sucursalOtorgante = servicio.filialOtorgante;
        const sucursalOrigen = servicio.filialOrigen;
        const filialOtorganteId = sucursalOtorgante?.filialId;
        const filialOrigenId = sucursalOrigen?.filialId;

        if (filialOtorganteId == null || filialOrigenId == null) {
          continue;
        }

        // Ignorar servicios internos (misma filial origen y otorgante)
        if (
          filialOtorganteId === filialOrigenId
        ) {
          continue;
        }

        const esOtorgante = filialOtorganteId === filialId;
        const esOrigen = filialOrigenId === filialId;

        if (!esOtorgante && !esOrigen) continue;

        const otherFilialId = esOtorgante
          ? filialOrigenId
          : filialOtorganteId;
        const otherFilial = filialesMap.get(otherFilialId);
        const isOtherUsa = otherFilial?.extranjera || false;

        const monto = Number(servicio.fori_Saldo_Contrato || 0);
        let tipo: 'FAVOR' | 'PAGAR' | 'USA';

        // Regla: La filial Origen SIEMPRE paga a la Otorgante.
        // Si soy Otorgante -> Me pagan (Favor)
        // Si soy Origen -> Yo pago (Pagar)
        const isReceivable = esOtorgante;

        if (isOtherUsa) {
           tipo = 'USA';
           if (isReceivable) {
               usaFavor += monto;
           } else {
               usaPagar += monto;
           }
        } else {
            if (isReceivable) {
                tipo = 'FAVOR';
                favor += monto;
            } else {
                tipo = 'PAGAR';
                pagar += monto;
            }
        }

        detallesToCreate.push({
            servicioId: servicio.id,
            tipo,
            monto,
            filialOrigenId: filialOrigenId,
            filialOtorganteId: filialOtorganteId
        });
      }

      if (detallesToCreate.length > 0) {
          const totalUsa = usaFavor - usaPagar;
          const totalNeto = (favor - pagar) + totalUsa;

          const cedula = await CedulaModel.create({
              periodoId: periodo.id,
              filialId: filialId,
              totalFavor: favor,
              totalPagar: pagar,
              totalUsa: totalUsa,
              totalNeto: totalNeto
          });

          const detallesWithCedulaId = detallesToCreate.map(d => ({
              ...d,
              cedulaId: cedula.id
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
}
