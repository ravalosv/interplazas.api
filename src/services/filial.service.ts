import { Transaction } from "sequelize";
import { IFilial } from "../data/interfaces/filial.interface";
import { FilialModel } from "../data/models/models";

export const getFiliales = async () => {
  const filiales = await FilialModel.findAll();
  return filiales.map((f) => f.toJSON());
};

export const getFilialById = async (id: number) => {
  const filial = await FilialModel.findByPk(id);
  if (!filial) throw new Error("FILIAL_NOT_FOUND");
  return filial.toJSON();
};

export const createFilial = async ({ nombre, extranjera }: IFilial) => {
  const t = await FilialModel.sequelize!.transaction();
  try {
    const nueva = await FilialModel.create({ nombre, extranjera }, { transaction: t });
    await t.commit();
    return nueva.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateFilial = async (id: number, { nombre, extranjera }: Partial<IFilial>) => {
  const t = await FilialModel.sequelize!.transaction();
  try {
    const filial = await FilialModel.findByPk(id);
    if (!filial) throw new Error("FILIAL_NOT_FOUND");

    const actualizada = await filial.update(
      { nombre, extranjera },
      { transaction: t }
    );
    await t.commit();
    return actualizada.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteFilial = async (id: number) => {
  const t = await FilialModel.sequelize!.transaction();
  try {
    const filial = await FilialModel.findByPk(id);
    if (!filial) throw new Error("FILIAL_NOT_FOUND");

    await filial.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

