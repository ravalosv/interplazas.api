import { DataTypes, Model } from "sequelize";
import interDB from "../../core/dbconfig/mariadb";
import { IUser } from "../interfaces/user.interface";
import { IFilial } from "../interfaces/filial.interface";
import { ITipoUsuario } from "../interfaces/tipo_usuario.interface";
import { ITipoDocumento } from "../interfaces/tipo_documento.interface";
import { ITipoServicio } from "../interfaces/tipo_servicio.interface";
import { ITipoAtaud } from "../interfaces/tipo_ataud.interface";
import { IMotivoNoOtorgado } from "../interfaces/motivos_no_otorgado.interface";
import { IEstadoCtaStatus } from "../interfaces/estado_cta_status.interface";
import { IStatus } from "../interfaces/status.interface";


// Define el modelo usando la interfaz
class UserModel extends Model<IUser> implements IUser {
  public id!: number;
  public name!: string;
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

class TipoDocumentoModel extends Model<ITipoDocumento> implements ITipoDocumento {
  public id!: number;
  public nombre!: string;
}

TipoDocumentoModel.init(
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
    modelName: "TipoDocumento",
    tableName: "tipos_documentos",
    timestamps: true,
  }
);

class TipoServicioModel extends Model<ITipoServicio> implements ITipoServicio {
  public id!: number;
  public nombre!: string;
}

TipoServicioModel.init(
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
    modelName: "TipoServicio",
    tableName: "tipos_servicios",
    timestamps: true,
  }
);

class TipoAtaudModel extends Model<ITipoAtaud> implements ITipoAtaud {
  public id!: number;
  public nombre!: string;
}

TipoAtaudModel.init(
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
    modelName: "TipoAtaud",
    tableName: "tipos_ataudes",
    timestamps: true,
  }
);

class MotivoNoOtorgadoModel extends Model<IMotivoNoOtorgado> implements IMotivoNoOtorgado {
  public id!: number;
  public nombre!: string;
}

MotivoNoOtorgadoModel.init(
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
    modelName: "MotivoNoOtorgado",
    tableName: "motivos_no_otorgados",
    timestamps: true,
  }
);

class EstadoCtaStatusModel extends Model<IEstadoCtaStatus> implements IEstadoCtaStatus {
  public id!: number;
  public nombre!: string;
}

EstadoCtaStatusModel.init(
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
    modelName: "EstadoCtaStatus",
    tableName: "estado_cta_status",
    timestamps: true,
  }
);

class StatusModel extends Model<IStatus> implements IStatus {
  public id!: number;
  public nombre!: string;
}

StatusModel.init(
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
    modelName: "Status",
    tableName: "status",
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
  TipoDocumentoModel,
  TipoServicioModel,
  TipoAtaudModel,
  MotivoNoOtorgadoModel,
  EstadoCtaStatusModel,
  StatusModel,
};
