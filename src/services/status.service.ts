import { IStatus } from "../data/interfaces/status.interface";
import { StatusContratoModel } from "../data/models/models";

export const getStatus = async () => {
  const items = await StatusContratoModel.findAll();
  return items.map((s) => s.toJSON());
};

export const getStatusById = async (id: number) => {
  const item = await StatusContratoModel.findByPk(id);
  if (!item) throw new Error("STATUS_NOT_FOUND");
  return item.toJSON();
};

export const createStatus = async ({ nombre }: IStatus) => {
  const t = await StatusContratoModel.sequelize!.transaction();
  try {
    const nuevo = await StatusContratoModel.create({ nombre }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateStatus = async (id: number, { nombre }: Partial<IStatus>) => {
  const t = await StatusContratoModel.sequelize!.transaction();
  try {
    const item = await StatusContratoModel.findByPk(id);
    if (!item) throw new Error("STATUS_NOT_FOUND");
    const actualizado = await item.update({ nombre }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteStatus = async (id: number) => {
  const t = await StatusContratoModel.sequelize!.transaction();
  try {
    const item = await StatusContratoModel.findByPk(id);
    if (!item) throw new Error("STATUS_NOT_FOUND");
    await item.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
