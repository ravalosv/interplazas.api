import { DataTypes, Model } from "sequelize";
import interDB from "../../core/dbconfig/mariadb";
import { IUser } from "../interfaces/user.interface";
import { IFilial } from "../interfaces/filial.interface";
import { ITipoUsuario } from "../interfaces/tipo_usuario.interface";


// Define el modelo usando la interfaz
class UserModel extends Model<IUser> implements IUser {
  public id!: number;
  public name!: string;
  public role!: "admin" | "filial";
  public email!: string;
  public password!: string;
  public createdByUserId!: number;
  public isDisabled!: boolean;
  public tipoUsuarioId!: number;
  public filialId!: number | null;
}

// Define la estructura del modelo en Sequelize
UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoUsuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "tipos_usuarios", key: "id" },
    },
    filialId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: { model: "filiales", key: "id" },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: { args: [["admin", "repre", "reports"]], msg: "Role inválido" },
      },
    },
    isDisabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    createdByUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

  },
  {
    sequelize: interDB,
    modelName: "User", // nombre del modelo
    tableName: "usuarios",
    timestamps: true, // si no necesitas createdAt y updatedAt
  }
);


class FilialModel extends Model<IFilial> implements IFilial {
  public id!: number;
  public nombre!: string;
  public extranjera!: boolean;
}

FilialModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extranjera: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: interDB,
    modelName: "Filial",
    tableName: "filiales",
    timestamps: true,
  }
);

class TipoUsuarioModel extends Model<ITipoUsuario> implements ITipoUsuario {
  public id!: number;
  public nombre!: string;
}

TipoUsuarioModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: interDB,
    modelName: "TipoUsuario",
    tableName: "tipos_usuarios",
    timestamps: true,
  }
);

/* RELACIONES */

UserModel.belongsTo(TipoUsuarioModel, { foreignKey: "tipoUsuarioId", as: "tipoUsuario" });
UserModel.belongsTo(FilialModel, { foreignKey: "filialId", as: "filial" });

export {
  UserModel,
  FilialModel,
  TipoUsuarioModel,
};
