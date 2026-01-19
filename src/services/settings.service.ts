import { ISettings } from "../data/interfaces/settings.interface";
import { SettingsModel } from "../data/models/models";

export const getSettings = async () => {
  const settings = await SettingsModel.findAll();
  return settings.map((s) => s.toJSON());
};

export const getSettingById = async (id: number) => {
  const setting = await SettingsModel.findByPk(id);
  if (!setting) throw new Error("SETTING_NOT_FOUND");
  return setting.toJSON();
};

export const createSetting = async ({ comisionPF }: ISettings) => {
  const t = await SettingsModel.sequelize!.transaction();
  try {
    const nuevo = await SettingsModel.create({ comisionPF }, { transaction: t });
    await t.commit();
    return nuevo.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const updateSetting = async (id: number, { comisionPF }: Partial<ISettings>) => {
  const t = await SettingsModel.sequelize!.transaction();
  try {
    const setting = await SettingsModel.findByPk(id);
    if (!setting) throw new Error("SETTING_NOT_FOUND");
    const actualizado = await setting.update({ comisionPF }, { transaction: t });
    await t.commit();
    return actualizado.toJSON();
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const deleteSetting = async (id: number) => {
  const t = await SettingsModel.sequelize!.transaction();
  try {
    const setting = await SettingsModel.findByPk(id);
    if (!setting) throw new Error("SETTING_NOT_FOUND");
    await setting.destroy({ transaction: t });
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
