import { IConcepto } from "../data/interfaces/concepto.interface";
import { ConceptoModel } from "../data/models/models";

export const getConceptos = async () => {
  const conceptos = await ConceptoModel.findAll();
  return conceptos.map((t) => t.toJSON());
};

export const getConceptoById = async (id: number) => {
  const concepto = await ConceptoModel.findByPk(id);
  if (!concepto) throw new Error("CONCEPTO_NOT_FOUND");
  return concepto.toJSON();
};

export const createConcepto = async ({ nombre, montoMXN, montoUSD }: IConcepto) => {
  const t = await ConceptoModel.sequelize!.transaction();
  try {
    const nuevo = await ConceptoModel.create({ nombre, montoMXN, montoUSD }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateConcepto = async (id: number, { nombre, montoMXN, montoUSD }: Partial<IConcepto>) => {
  const t = await ConceptoModel.sequelize!.transaction();
  try {
    const concepto = await ConceptoModel.findByPk(id);
    if (!concepto) throw new Error("CONCEPTO_NOT_FOUND");
    const actualizado = await concepto.update({ nombre, montoMXN, montoUSD }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteConcepto = async (id: number) => {
  const t = await ConceptoModel.sequelize!.transaction();
  try {
    const concepto = await ConceptoModel.findByPk(id);
    if (!concepto) throw new Error("CONCEPTO_NOT_FOUND");
    await concepto.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
