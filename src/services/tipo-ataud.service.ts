import { ITipoAtaud } from "../data/interfaces/tipo_ataud.interface";
import { TipoAtaudModel } from "../data/models/models";

export const getTiposAtaud = async () => {
  const tipos = await TipoAtaudModel.findAll();
  return tipos.map((t) => t.toJSON());
};

export const getTipoAtaudById = async (id: number) => {
  const tipo = await TipoAtaudModel.findByPk(id);
  if (!tipo) throw new Error("TIPO_ATAUD_NOT_FOUND");
  return tipo.toJSON();
};

export const createTipoAtaud = async ({ nombre }: ITipoAtaud) => {
  const t = await TipoAtaudModel.sequelize!.transaction();
  try {
    const nuevo = await TipoAtaudModel.create({ nombre }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateTipoAtaud = async (id: number, { nombre }: Partial<ITipoAtaud>) => {
  const t = await TipoAtaudModel.sequelize!.transaction();
  try {
    const tipo = await TipoAtaudModel.findByPk(id);
    if (!tipo) throw new Error("TIPO_ATAUD_NOT_FOUND");
    const actualizado = await tipo.update({ nombre }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteTipoAtaud = async (id: number) => {
  const t = await TipoAtaudModel.sequelize!.transaction();
  try {
    const tipo = await TipoAtaudModel.findByPk(id);
    if (!tipo) throw new Error("TIPO_ATAUD_NOT_FOUND");
    await tipo.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
