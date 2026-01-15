import { IGrupo } from "../data/interfaces/grupo.interface";
import { FilialModel, GrupoModel } from "../data/models/models";

export const getGrupos = async () => {
  const grupos = await GrupoModel.findAll();
  return grupos.map((g) => g.toJSON());
};

export const getGrupoById = async (id: number) => {
  const grupo = await GrupoModel.findByPk(id);
  if (!grupo) throw new Error("GRUPO_NOT_FOUND");
  return grupo.toJSON();
};

export const createGrupo = async ({ nombre, cobroEntreFiliales }: IGrupo) => {
  const t = await GrupoModel.sequelize!.transaction();
  try {
    const nuevo = await GrupoModel.create({ nombre, cobroEntreFiliales }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateGrupo = async (id: number, { nombre, cobroEntreFiliales }: Partial<IGrupo>) => {
  const t = await GrupoModel.sequelize!.transaction();
  try {
    const grupo = await GrupoModel.findByPk(id);
    if (!grupo) throw new Error("GRUPO_NOT_FOUND");

    const actualizado = await grupo.update(
      { nombre, cobroEntreFiliales },
      { transaction: t }
    );
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteGrupo = async (id: number) => {
  const t = await GrupoModel.sequelize!.transaction();
  try {
    const grupo = await GrupoModel.findByPk(id);
    if (!grupo) throw new Error("GRUPO_NOT_FOUND");

    const filialesCount = await FilialModel.count({ where: { grupoId: id } });
    if (filialesCount > 0) {
      throw new Error("GRUPO_HAS_FILIALES");
    }

    await grupo.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
