import { ServicioObservacionModel, UserModel, ServicioModel } from "../data/models/models";
import { IServicioObservacion } from "../data/interfaces/servicio_observacion.interface";
import { ServicioLogService } from "./servicio-log.service";

const logService = new ServicioLogService();

export const getObservacionesByServicio = async (servicioId: number) => {
  const items = await ServicioObservacionModel.findAll({
    where: { servicioId },
    include: [
      {
        model: UserModel,
        as: "usuario",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "ASC"]],
  });
  return items.map((i: ServicioObservacionModel) => i.toJSON());
};

export const createObservacion = async (servicioId: number, usuarioId: number, observacion: string) => {
  // Validar periodo cerrado
  const servicio = await ServicioModel.findByPk(servicioId, { include: ["periodo"] });
  if (!servicio) throw new Error("Servicio no encontrado");
  
  // @ts-ignore
  if (servicio.periodo && !servicio.periodo.activo) {
    throw new Error("No se puede agregar observaciones a un servicio de un periodo cerrado.");
  }

  const t = await ServicioObservacionModel.sequelize!.transaction();
  try {
    const created = await ServicioObservacionModel.create(
      { servicioId, usuarioId, observacion } as IServicioObservacion,
      { transaction: t }
    );
    await t.commit();
    await logService.logAction(servicioId, usuarioId, "CREACION_OBSERVACION", `Observación agregada: ${observacion}`);
    return created.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteObservacion = async (id: number, usuarioId: number) => {
  const t = await ServicioObservacionModel.sequelize!.transaction();
  try {
    const item = await ServicioObservacionModel.findByPk(id, { 
      transaction: t,
      include: [{ model: ServicioModel, as: 'servicio', include: ['periodo'] }]
    });
    
    if (!item) {
      await t.rollback();
      return false;
    }

    // @ts-ignore
    if (item.servicio && item.servicio.periodo && !item.servicio.periodo.activo) {
      await t.rollback();
      throw new Error("No se puede eliminar observaciones de un servicio de un periodo cerrado.");
    }

    const servicioId = item.servicioId;
    const observacionTexto = item.observacion;

    await item.destroy({ transaction: t });
    await t.commit();
    await logService.logAction(servicioId, usuarioId, "ELIMINACION_OBSERVACION", `Observación eliminada: ${observacionTexto}`);
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
