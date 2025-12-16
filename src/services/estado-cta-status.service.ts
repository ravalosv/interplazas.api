import { IEstadoCtaStatus } from "../data/interfaces/estado_cta_status.interface";
import { EstadoCtaStatusModel } from "../data/models/models";

export const getEstadosCtaStatus = async () => {
  const estados = await EstadoCtaStatusModel.findAll();
  return estados.map((e) => e.toJSON());
};

export const getEstadoCtaStatusById = async (id: number) => {
  const estado = await EstadoCtaStatusModel.findByPk(id);
  if (!estado) throw new Error("ESTADO_CTA_STATUS_NOT_FOUND");
  return estado.toJSON();
};

export const createEstadoCtaStatus = async ({ nombre }: IEstadoCtaStatus) => {
  const t = await EstadoCtaStatusModel.sequelize!.transaction();
  try {
    const nuevo = await EstadoCtaStatusModel.create({ nombre }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateEstadoCtaStatus = async (id: number, { nombre }: Partial<IEstadoCtaStatus>) => {
  const t = await EstadoCtaStatusModel.sequelize!.transaction();
  try {
    const estado = await EstadoCtaStatusModel.findByPk(id);
    if (!estado) throw new Error("ESTADO_CTA_STATUS_NOT_FOUND");
    const actualizado = await estado.update({ nombre }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteEstadoCtaStatus = async (id: number) => {
  const t = await EstadoCtaStatusModel.sequelize!.transaction();
  try {
    const estado = await EstadoCtaStatusModel.findByPk(id);
    if (!estado) throw new Error("ESTADO_CTA_STATUS_NOT_FOUND");
    await estado.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
