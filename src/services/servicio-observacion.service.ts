import { ServicioObservacionModel, UserModel } from "../data/models/models";
import { IServicioObservacion } from "../data/interfaces/servicio_observacion.interface";

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
  const t = await ServicioObservacionModel.sequelize!.transaction();
  try {
    const created = await ServicioObservacionModel.create(
      { servicioId, usuarioId, observacion } as IServicioObservacion,
      { transaction: t }
    );
    await t.commit();
    return created.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteObservacion = async (id: number) => {
  const t = await ServicioObservacionModel.sequelize!.transaction();
  try {
    const item = await ServicioObservacionModel.findByPk(id, { transaction: t });
    if (!item) {
      await t.rollback();
      return false;
    }
    await item.destroy({ transaction: t });
    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
