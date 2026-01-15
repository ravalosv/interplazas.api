import { ICostos } from "../data/interfaces/costos.interface";
import { CostosModel } from "../data/models/models";

export const getCostos = async () => {
  const costos = await CostosModel.findAll();
  return costos.map((c) => c.toJSON());
};

export const getCostoById = async (id: number) => {
  const costo = await CostosModel.findByPk(id);
  if (!costo) throw new Error("COSTO_NOT_FOUND");
  return costo.toJSON();
};

export const createCosto = async ({ costo_servicio }: ICostos) => {
  const t = await CostosModel.sequelize!.transaction();
  try {
    const nuevo = await CostosModel.create({ costo_servicio }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateCosto = async (id: number, { costo_servicio }: Partial<ICostos>) => {
  const t = await CostosModel.sequelize!.transaction();
  try {
    const costo = await CostosModel.findByPk(id);
    if (!costo) throw new Error("COSTO_NOT_FOUND");
    const actualizado = await costo.update({ costo_servicio }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteCosto = async (id: number) => {
  const t = await CostosModel.sequelize!.transaction();
  try {
    const costo = await CostosModel.findByPk(id);
    if (!costo) throw new Error("COSTO_NOT_FOUND");
    await costo.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
