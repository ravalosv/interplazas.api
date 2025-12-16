import { ITipoServicio } from "../data/interfaces/tipo_servicio.interface";
import { TipoServicioModel } from "../data/models/models";

export const getTiposServicio = async () => {
  const tipos = await TipoServicioModel.findAll();
  return tipos.map((t) => t.toJSON());
};

export const getTipoServicioById = async (id: number) => {
  const tipo = await TipoServicioModel.findByPk(id);
  if (!tipo) throw new Error("TIPO_SERVICIO_NOT_FOUND");
  return tipo.toJSON();
};

export const createTipoServicio = async ({ nombre }: ITipoServicio) => {
  const t = await TipoServicioModel.sequelize!.transaction();
  try {
    const nuevo = await TipoServicioModel.create({ nombre }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateTipoServicio = async (id: number, { nombre }: Partial<ITipoServicio>) => {
  const t = await TipoServicioModel.sequelize!.transaction();
  try {
    const tipo = await TipoServicioModel.findByPk(id);
    if (!tipo) throw new Error("TIPO_SERVICIO_NOT_FOUND");
    const actualizado = await tipo.update({ nombre }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteTipoServicio = async (id: number) => {
  const t = await TipoServicioModel.sequelize!.transaction();
  try {
    const tipo = await TipoServicioModel.findByPk(id);
    if (!tipo) throw new Error("TIPO_SERVICIO_NOT_FOUND");
    await tipo.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
