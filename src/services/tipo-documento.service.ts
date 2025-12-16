import { ITipoDocumento } from "../data/interfaces/tipo_documento.interface";
import { TipoDocumentoModel } from "../data/models/models";

export const getTiposDocumento = async () => {
  const tipos = await TipoDocumentoModel.findAll();
  return tipos.map((t) => t.toJSON());
};

export const getTipoDocumentoById = async (id: number) => {
  const tipo = await TipoDocumentoModel.findByPk(id);
  if (!tipo) throw new Error("TIPO_DOCUMENTO_NOT_FOUND");
  return tipo.toJSON();
};

export const createTipoDocumento = async ({ nombre }: ITipoDocumento) => {
  const t = await TipoDocumentoModel.sequelize!.transaction();
  try {
    const nuevo = await TipoDocumentoModel.create({ nombre }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateTipoDocumento = async (id: number, { nombre }: Partial<ITipoDocumento>) => {
  const t = await TipoDocumentoModel.sequelize!.transaction();
  try {
    const tipo = await TipoDocumentoModel.findByPk(id);
    if (!tipo) throw new Error("TIPO_DOCUMENTO_NOT_FOUND");
    const actualizado = await tipo.update({ nombre }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteTipoDocumento = async (id: number) => {
  const t = await TipoDocumentoModel.sequelize!.transaction();
  try {
    const tipo = await TipoDocumentoModel.findByPk(id);
    if (!tipo) throw new Error("TIPO_DOCUMENTO_NOT_FOUND");
    await tipo.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
