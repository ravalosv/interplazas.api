import { ISucursal } from "../data/interfaces/sucursal.interface";
import { SucursalModel, FilialModel, GrupoModel } from "../data/models/models";

export const getSucursales = async () => {
  const sucursales = await SucursalModel.findAll({
    include: [
      {
        model: FilialModel,
        as: "filial",
        include: [{ model: GrupoModel, as: "grupo" }],
      },
    ],
    order: [['nombre', 'ASC']],
  });
  return sucursales.map((s) => s.toJSON());
};

export const getSucursalById = async (id: number) => {
  const sucursal = await SucursalModel.findByPk(id, {
    include: [
      {
        model: FilialModel,
        as: "filial",
        include: [{ model: GrupoModel, as: "grupo" }],
      },
    ],
  });
  if (!sucursal) throw new Error("SUCURSAL_NOT_FOUND");
  return sucursal.toJSON();
};

export const createSucursal = async ({ nombre, filialId }: ISucursal) => {
  const t = await SucursalModel.sequelize!.transaction();
  try {
    const nueva = await SucursalModel.create({ nombre, filialId }, { transaction: t });
    await t.commit();
    return nueva.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateSucursal = async (id: number, { nombre, filialId }: Partial<ISucursal>) => {
  const t = await SucursalModel.sequelize!.transaction();
  try {
    const sucursal = await SucursalModel.findByPk(id);
    if (!sucursal) throw new Error("SUCURSAL_NOT_FOUND");

    const actualizada = await sucursal.update(
      { nombre, filialId },
      { transaction: t }
    );
    await t.commit();
    return actualizada.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteSucursal = async (id: number) => {
  const t = await SucursalModel.sequelize!.transaction();
  try {
    const sucursal = await SucursalModel.findByPk(id);
    if (!sucursal) throw new Error("SUCURSAL_NOT_FOUND");

    await sucursal.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
