import { ITipoUsuario } from "../data/interfaces/tipo_usuario.interface";
import { TipoUsuarioModel } from "../data/models/models";

export const getTiposUsuario = async () => {
  const tipos = await TipoUsuarioModel.findAll();
  return tipos.map((t) => t.toJSON());
};

export const getTipoUsuarioById = async (id: number) => {
  const tipo = await TipoUsuarioModel.findByPk(id);
  if (!tipo) throw new Error("TIPO_USUARIO_NOT_FOUND");
  return tipo.toJSON();
};

export const createTipoUsuario = async ({ nombre }: ITipoUsuario) => {
  const t = await TipoUsuarioModel.sequelize!.transaction();
  try {
    const nuevo = await TipoUsuarioModel.create({ nombre }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateTipoUsuario = async (id: number, { nombre }: Partial<ITipoUsuario>) => {
  const t = await TipoUsuarioModel.sequelize!.transaction();
  try {
    const tipo = await TipoUsuarioModel.findByPk(id);
    if (!tipo) throw new Error("TIPO_USUARIO_NOT_FOUND");

    const actualizado = await tipo.update({ nombre }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteTipoUsuario = async (id: number) => {
  const t = await TipoUsuarioModel.sequelize!.transaction();
  try {
    const tipo = await TipoUsuarioModel.findByPk(id);
    if (!tipo) throw new Error("TIPO_USUARIO_NOT_FOUND");

    await tipo.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

