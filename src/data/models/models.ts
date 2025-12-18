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
import { IServicio } from "../interfaces/servicios.interface";
import { IPeriodo } from "../interfaces/periodo.interface";


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

class ServicioModel extends Model<IServicio> implements IServicio {
  public id!: number;
  public whatsapp!: string;
  public fo_Filial_otorgante_Id!: number;
  public fo_Filial_Origen_Id!: number;
  public fo_Contrato!: string;
  public fo_Nombre_Titular!: string;
  public fo_Nombre_Finado!: string;
  public fo_Documento_Cliente_Id!: number;
  public fo_Jefe_Turno_Nombre!: string;
  public fo_Jefe_Turno_Puesto!: string;
  public fo_Jefe_Turno_WhatsApp!: string;
  public fo_Fecha_Servicio!: Date;
  public fori_Status_Contrato_Id!: number;
  public fori_Saldo_Contrato!: number;
  public fori_Acepta_Convenio!: boolean;
  public fori_Otorga_Info_Nombre!: string;
  public fori_Otorga_Info_Puesto!: string;
  public fori_Otorga_Info_Telefono!: string;
  public fo_Contrato_Monto_Recuperado!: number;
  public fo_Contrato_Monto_Convenio!: number;
  public fo_Tipo_Servicio_Id!: number;
  public fo_Tipo_Ataud_Id!: number;
  public exp_Solicitud_Servicio_Status_id!: number;
  public exp_Solicitud_Servicio_File_Name!: string;
  public exp_Comprobante_Pago_Status_Id!: number;
  public exp_Comprobante_Pago_File_Name!: string;
  public exp_Convenio_Status_Id!: number;
  public exp_Convenio_File_Name!: string;
  public exp_Enviado_Grupo_Whats!: boolean;
  public exp_Motivo_De_No_Otorgado_Id!: number;
  public exp_Expediente_Completo!: string;
  public exp_Observaciones!: string;
  public penalizado!: boolean;
  public PeriodoId!: number;
  public Usuario_CapturaId!: number;
  public Fecha_Captura!: Date;
}

ServicioModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Filial_otorgante_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "filiales", key: "id" },
    },
    fo_Filial_Origen_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "filiales", key: "id" },
    },
    fo_Contrato: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Nombre_Titular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Nombre_Finado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Documento_Cliente_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "tipos_documentos", key: "id" },
    },
    fo_Jefe_Turno_Nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Jefe_Turno_Puesto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Jefe_Turno_WhatsApp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Fecha_Servicio: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fori_Status_Contrato_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "status", key: "id" },
    },
    fori_Saldo_Contrato: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    fori_Acepta_Convenio: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    fori_Otorga_Info_Nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fori_Otorga_Info_Puesto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fori_Otorga_Info_Telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Contrato_Monto_Recuperado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    fo_Contrato_Monto_Convenio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    fo_Tipo_Servicio_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "tipos_servicios", key: "id" },
    },
    fo_Tipo_Ataud_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "tipos_ataudes", key: "id" },
    },
    exp_Solicitud_Servicio_Status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "estado_cta_status", key: "id" },
    },
    exp_Solicitud_Servicio_File_Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exp_Comprobante_Pago_Status_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "estado_cta_status", key: "id" },
    },
    exp_Comprobante_Pago_File_Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exp_Convenio_Status_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "estado_cta_status", key: "id" },
    },
    exp_Convenio_File_Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exp_Enviado_Grupo_Whats: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    exp_Motivo_De_No_Otorgado_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "motivos_no_otorgados", key: "id" },
    },
    exp_Expediente_Completo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exp_Observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    penalizado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    PeriodoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "periodos", key: "id" },
    },
    Usuario_CapturaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
    },
    Fecha_Captura: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: interDB,
    modelName: "Servicio",
    tableName: "servicios",
    timestamps: true,
  }
);


class PeriodoModel extends Model<IPeriodo> implements IPeriodo {
  public id!: number;
  public mes!: number;
  public anio!: number;
  public nombre!: string;
  public activo!: boolean;
}

PeriodoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: interDB,
    modelName: "Periodo",
    tableName: "periodos",
    timestamps: true,
  }
);


// Associations
UserModel.belongsTo(TipoUsuarioModel, { foreignKey: "tipoUsuarioId", as: "tipoUsuario" });
UserModel.belongsTo(FilialModel, { foreignKey: "filialId", as: "filial" });

// Relaciones para ServicioModel
ServicioModel.belongsTo(FilialModel, { foreignKey: "fo_Filial_otorgante_Id", as: "filialOtorgante" });
ServicioModel.belongsTo(FilialModel, { foreignKey: "fo_Filial_Origen_Id", as: "filialOrigen" });
ServicioModel.belongsTo(TipoDocumentoModel, { foreignKey: "fo_Documento_Cliente_Id", as: "tipoDocumento" });
ServicioModel.belongsTo(StatusModel, { foreignKey: "fori_Status_Contrato_Id", as: "statusContrato" });
ServicioModel.belongsTo(TipoServicioModel, { foreignKey: "fo_Tipo_Servicio_Id", as: "tipoServicio" });
ServicioModel.belongsTo(TipoAtaudModel, { foreignKey: "fo_Tipo_Ataud_Id", as: "tipoAtaud" });
ServicioModel.belongsTo(EstadoCtaStatusModel, { foreignKey: "exp_Solicitud_Servicio_Status_id", as: "solicitudServicioStatus" });
ServicioModel.belongsTo(EstadoCtaStatusModel, { foreignKey: "exp_Comprobante_Pago_Status_Id", as: "comprobantePagoStatus" });
ServicioModel.belongsTo(EstadoCtaStatusModel, { foreignKey: "exp_Convenio_Status_Id", as: "convenioStatus" });
ServicioModel.belongsTo(MotivoNoOtorgadoModel, { foreignKey: "exp_Motivo_De_No_Otorgado_Id", as: "motivoNoOtorgado" });
ServicioModel.belongsTo(UserModel, { foreignKey: "Usuario_CapturaId", as: "usuarioCaptura" });
ServicioModel.belongsTo(PeriodoModel, { foreignKey: "PeriodoId", as: "periodo" });

export {
  UserModel,
  FilialModel,
  StatusModel,
  TipoUsuarioModel,
  TipoDocumentoModel,
  TipoServicioModel,
  TipoAtaudModel,
  MotivoNoOtorgadoModel,
  EstadoCtaStatusModel,
  ServicioModel,
  PeriodoModel,
};
