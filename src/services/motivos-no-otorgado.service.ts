import { IMotivoNoOtorgado } from "../data/interfaces/motivos_no_otorgado.interface";
import { MotivoNoOtorgadoModel } from "../data/models/models";

export const getMotivosNoOtorgado = async () => {
  const motivos = await MotivoNoOtorgadoModel.findAll();
  return motivos.map((m) => m.toJSON());
};

export const getMotivoNoOtorgadoById = async (id: number) => {
  const motivo = await MotivoNoOtorgadoModel.findByPk(id);
  if (!motivo) throw new Error("MOTIVO_NO_OTORGADO_NOT_FOUND");
  return motivo.toJSON();
};

export const createMotivoNoOtorgado = async ({ nombre }: IMotivoNoOtorgado) => {
  const t = await MotivoNoOtorgadoModel.sequelize!.transaction();
  try {
    const nuevo = await MotivoNoOtorgadoModel.create({ nombre }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateMotivoNoOtorgado = async (id: number, { nombre }: Partial<IMotivoNoOtorgado>) => {
  const t = await MotivoNoOtorgadoModel.sequelize!.transaction();
  try {
    const motivo = await MotivoNoOtorgadoModel.findByPk(id);
    if (!motivo) throw new Error("MOTIVO_NO_OTORGADO_NOT_FOUND");
    const actualizado = await motivo.update({ nombre }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteMotivoNoOtorgado = async (id: number) => {
  const t = await MotivoNoOtorgadoModel.sequelize!.transaction();
  try {
    const motivo = await MotivoNoOtorgadoModel.findByPk(id);
    if (!motivo) throw new Error("MOTIVO_NO_OTORGADO_NOT_FOUND");
    await motivo.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
