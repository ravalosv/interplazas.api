import { ICanalComunicacion } from "../data/interfaces/canal_comunicacion.interface";
import { CanalComunicacionModel } from "../data/models/models";

export const getCanalesComunicacion = async () => {
  const canales = await CanalComunicacionModel.findAll();
  return canales.map((c) => c.toJSON());
};

export const getCanalComunicacionById = async (id: number) => {
  const canal = await CanalComunicacionModel.findByPk(id);
  if (!canal) throw new Error("CANAL_COMUNICACION_NOT_FOUND");
  return canal.toJSON();
};

export const createCanalComunicacion = async ({ nombre, whatsApp }: ICanalComunicacion) => {
  const t = await CanalComunicacionModel.sequelize!.transaction();
  try {
    const nuevo = await CanalComunicacionModel.create({ nombre, whatsApp }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateCanalComunicacion = async (
  id: number,
  { nombre, whatsApp }: Partial<ICanalComunicacion>
) => {
  const t = await CanalComunicacionModel.sequelize!.transaction();
  try {
    const canal = await CanalComunicacionModel.findByPk(id);
    if (!canal) throw new Error("CANAL_COMUNICACION_NOT_FOUND");
    const actualizado = await canal.update({ nombre, whatsApp }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteCanalComunicacion = async (id: number) => {
  const t = await CanalComunicacionModel.sequelize!.transaction();
  try {
    const canal = await CanalComunicacionModel.findByPk(id);
    if (!canal) throw new Error("CANAL_COMUNICACION_NOT_FOUND");
    await canal.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

