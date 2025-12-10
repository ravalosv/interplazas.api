import { UserModel } from "../data/models/models";

//import UserModel from "../data/models/user.model";

export const getUsers = async ({ filter = "" }: { filter?: string } = {}) => {
  let whereCondition = {} as any;
  if (filter === "active") {
    whereCondition = { isDisabled: false };
  } else if (filter === "inactive") {
    whereCondition = { isDisabled: true };
  }

  const users = await UserModel.findAll({ where: whereCondition, include: ["tipoUsuario", "filial"] });

  const usersList = users.map((user) => {
    const { password: passHash, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  });

  return usersList;
};

export const getUserById = async (id: any) => {
  const userFound = await UserModel.findByPk(id, { include: ["tipoUsuario", "filial"] });

  const { password: passHash, ...userWithoutPassword } = userFound!.toJSON();

  return userWithoutPassword;
};

export const updateUser = async (id: any, { name, email, tipoUsuarioId, filialId }: any) => {
  const t = await UserModel.sequelize!.transaction();
  try {
    const userFound = await UserModel.findByPk(id);

    if (!userFound) {
      throw new Error("USER_NOT_FOUND");
    }

    const updatedUser = await userFound.update(
      {
        name,
        email,
        tipoUsuarioId,
        filialId,
      },
      { transaction: t }
    );

    const { password: pass, ...userWithoutPassword } = updatedUser.toJSON();

    await t.commit();
    return userWithoutPassword;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const disableUser = async (userId: string) => {
  const user = await UserModel.findByPk(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  await user.update({ isDisabled: true });

  const { password: passHash, ...userWithoutPassword } = user.toJSON();

  return userWithoutPassword;
};

export const activateUser = async (userId: string) => {
  const user = await UserModel.findByPk(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  await user.update({ isDisabled: false });

  const { password: passHash, ...userWithoutPassword } = user.toJSON();

  return userWithoutPassword;
};
