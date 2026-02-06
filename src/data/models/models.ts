import { DataTypes, Model } from "sequelize";
import interDB from "../../core/dbconfig/mariadb";
import { IUser } from "../interfaces/user.interface";
import { IFilial } from "../interfaces/filial.interface";
import { ITipoUsuario } from "../interfaces/tipo_usuario.interface";
import { ITipoDocumento } from "../interfaces/tipo_documento.interface";
import { ITipoServicio } from "../interfaces/tipo_servicio.interface";
import { IConcepto } from "../interfaces/concepto.interface";
import { IMotivoNoOtorgado } from "../interfaces/motivos_no_otorgado.interface";
import { IEstadoCtaStatus } from "../interfaces/estado_cta_status.interface";
import { IStatus } from "../interfaces/status.interface";
import { IServicio } from "../interfaces/servicios.interface";
import { IPeriodo } from "../interfaces/periodo.interface";
import { ICedula, ICedulaDetalle } from "../interfaces/cedula.interface";
import { ICostos } from "../interfaces/costos.interface";
import { IGrupo } from "../interfaces/grupo.interface";
import { ISucursal } from "../interfaces/sucursal.interface";
import { ICanalComunicacion } from "../interfaces/canal_comunicacion.interface";
import { IServicioObservacion } from "../interfaces/servicio_observacion.interface";
import { ISettings } from "../interfaces/settings.interface";
import { EstadoCuentaMovimientoModel, initEstadoCuentaMovimientoModel } from './estado-cuenta-movimiento.model';
import { TipoMovimientoEstadoCuentaModel, initTipoMovimientoEstadoCuentaModel } from './tipo-movimiento-estado-cuenta.model';


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
  public grupoId!: number;
  public extranjera!: boolean;
  public utilizaApi!: boolean;
  public apiUrl!: string;
  public apiKey!: string;
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
    grupoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "grupos",
        key: "id",
      },
    },
    extranjera: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    utilizaApi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    apiUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: interDB,
    modelName: "Filial",
    tableName: "filiales",
    timestamps: true,
  }
);

class SucursalModel extends Model<ISucursal> implements ISucursal {
  public id!: number;
  public nombre!: string;
  public filialId!: number;
}

SucursalModel.init(
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
    filialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "filiales", key: "id" },
    },
  },
  {
    sequelize: interDB,
    modelName: "Sucursal",
    tableName: "sucursales",
    timestamps: true,
  }
);

class CanalComunicacionModel extends Model<ICanalComunicacion> implements ICanalComunicacion {
  public id!: number;
  public nombre!: string;
  public whatsApp!: string;
}

CanalComunicacionModel.init(
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
    whatsApp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: interDB,
    modelName: "CanalComunicacion",
    tableName: "canales_comunicacion",
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

class ConceptoModel extends Model<IConcepto> implements IConcepto {
  public id!: number;
  public nombre!: string;
  public montoMXN!: number;
  public montoUSD!: number;
}

ConceptoModel.init(
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
    montoMXN: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    montoUSD: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize: interDB,
    modelName: "Concepto",
    tableName: "conceptos",
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

class StatusContratoModel extends Model<IStatus> implements IStatus {
  public id!: number;
  public nombre!: string;
}

StatusContratoModel.init(
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
    modelName: "StatusContrato",
    tableName: "status_contrato",
    timestamps: true,
  }
);

class ServicioModel extends Model<IServicio> implements IServicio {
  public id!: number;
  public canalComunicacionId!: number;
  public fo_Sucursal_otorgante_Id!: number;
  public fo_Sucursal_Origen_Id!: number;
  public fo_Contrato!: string;
  public fo_Nombre_Titular!: string;
  public fo_Nombre_Finado!: string;
  public fo_Documento_Cliente_Id!: number;
  public fo_Documento_Cliente_url!: string;
  public fo_Monto_devuelto_documento_url!: string;
  public fo_Monto_Devuelto!: number;
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
  public fo_Concepto_Id!: number;
  public exp_Solicitud_Servicio_Status_id!: number;
  public exp_Solicitud_Servicio_url!: string;
  public exp_Comprobante_Pago_Status_Id!: number;
  public exp_Comprobante_Pago_url!: string;
  public exp_Convenio_Status_Id!: number;
  public exp_Convenio_url!: string;
  public exp_Enviado_Grupo_Whats!: boolean;
  public exp_Motivo_De_No_Otorgado_Id!: number | null;
  public exp_Expediente_Completo!: string;
  public exp_Observaciones_cierre!: string;
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
    canalComunicacionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "canales_comunicacion", key: "id" },
    },
    fo_Sucursal_otorgante_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "sucursales", key: "id" },
    },
    fo_Sucursal_Origen_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "sucursales", key: "id" },
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
    fo_Documento_Cliente_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Monto_devuelto_documento_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fo_Monto_Devuelto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
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
      type: DataTypes.DATEONLY,
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
    fo_Concepto_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "conceptos", key: "id" },
    },
    exp_Solicitud_Servicio_Status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "estado_cta_status", key: "id" },
    },
    exp_Solicitud_Servicio_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exp_Comprobante_Pago_Status_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "estado_cta_status", key: "id" },
    },
    exp_Comprobante_Pago_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exp_Convenio_Status_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "estado_cta_status", key: "id" },
    },
    exp_Convenio_url: {
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
    exp_Observaciones_cierre: {
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
  public estadoCuentaGenerado!: boolean;
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
    estadoCuentaGenerado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: interDB,
    modelName: "Periodo",
    tableName: "periodos",
    timestamps: true,
  }
);


class CedulaModel extends Model<ICedula> implements ICedula {
  public id!: number;
  public periodoId!: number;
  public periodoNombre!: string;
  public filialId!: number;
  public filialNombre!: string;
  public grupoId!: number;
  public grupoNombre!: string;
  public subTotalFavor!: number;
  public subTotalPagar!: number;
  public totalUsa!: number;
  public totalComisiones!: number;
  public comisionPF!: number;
  public saldosEfectivamenteCobradosFavor!: number;
  public saldosEfectivamenteCobradosPagar!: number;
  public saldosEfectivamenteCobradosTotal!: number;
  public totalMontoContrato!: number;
  public totalFinal!: number;
  public filial?: FilialModel;
  public grupo?: IGrupo;
}

CedulaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    periodoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "periodos", key: "id" },
    },
    periodoNombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "filiales", key: "id" },
    },
    filialNombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grupoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    grupoNombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subTotalFavor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    subTotalPagar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalUsa: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalComisiones: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    comisionPF: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    saldosEfectivamenteCobradosFavor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    saldosEfectivamenteCobradosPagar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    saldosEfectivamenteCobradosTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalMontoContrato: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    totalFinal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: interDB,
    modelName: "Cedula",
    tableName: "cedulas",
    timestamps: true,
  }
);

class CedulaDetalleModel extends Model<ICedulaDetalle> implements ICedulaDetalle {
  public id!: number;
  public cedulaId!: number;
  public servicioId!: number;
  public tipo!: 'FAVOR' | 'PAGAR' | 'USA';
  public sucursalOrigenNombre!: string;
  public monto!: number;
  public sucursalOrigenId!: number;
  public sucursalOtorganteId!: number;
  public sucursalOtorganteNombre!: string;
  public titular!: string;
  public finado!: string;
  public contrato!: string;
  public fecha!: Date;
  public conceptoId!: number;
  public conceptoNombre!: string;
  public saldoPABS!: number;
  public observacion!: string;
  public penalizado!: boolean;
  public esFilialesHermanas!: boolean;
  public saldoEfectivamenteCobrado!: number;
  public montoEnContrato!: number;
  public montoDevuelto!: number;
  public aceptaConvenio!: boolean;
}

CedulaDetalleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cedulaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "cedulas", key: "id" },
    },
    servicioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "servicios", key: "id" },
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sucursalOrigenNombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sucursalOrigenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "sucursales", key: "id" },
    },
    sucursalOtorganteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "sucursales", key: "id" },
    },
    sucursalOtorganteNombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    titular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    finado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contrato: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    conceptoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "conceptos", key: "id" },
    },
    conceptoNombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    saldoPABS: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    penalizado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    esFilialesHermanas: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    saldoEfectivamenteCobrado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    montoEnContrato: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    montoDevuelto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    aceptaConvenio: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: interDB,
    modelName: "CedulaDetalle",
    tableName: "cedula_detalles",
    timestamps: true,
  }
);

initEstadoCuentaMovimientoModel(interDB);
initTipoMovimientoEstadoCuentaModel(interDB);


class CostosModel extends Model<ICostos> implements ICostos {
  public id!: number;
  public costo_servicio!: number;
}

CostosModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    costo_servicio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize: interDB,
    modelName: "Costos",
    tableName: "costos",
    timestamps: true,
  }
);

class GrupoModel extends Model<IGrupo> implements IGrupo {
  public id!: number;
  public nombre!: string;
  public cobroEntreFiliales!: boolean;
}

GrupoModel.init(
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
    cobroEntreFiliales: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: interDB,
    modelName: "Grupo",
    tableName: "grupos",
    timestamps: true,
  }
);

class ServicioObservacionModel extends Model<IServicioObservacion> implements IServicioObservacion {
  public id!: number;
  public observacion!: string;
  public usuarioId!: number;
  public servicioId!: number;
}

ServicioObservacionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
    },
    servicioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "servicios", key: "id" },
    },
  },
  {
    sequelize: interDB,
    modelName: "ServicioObservacion",
    tableName: "servicios_observaciones",
    timestamps: true,
  }
);

class SettingsModel extends Model<ISettings> implements ISettings {
  public id!: number;
  public comisionPF!: number;
}

SettingsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comisionPF: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: interDB,
    modelName: "Settings",
    tableName: "settings",
    timestamps: true,
  }
);

// Associations
FilialModel.belongsTo(GrupoModel, { foreignKey: "grupoId", as: "grupo" });
GrupoModel.hasMany(FilialModel, { foreignKey: "grupoId", as: "filiales" });

SucursalModel.belongsTo(FilialModel, { foreignKey: "filialId", as: "filial" });
FilialModel.hasMany(SucursalModel, { foreignKey: "filialId", as: "sucursales" });

UserModel.belongsTo(TipoUsuarioModel, { foreignKey: "tipoUsuarioId", as: "tipoUsuario" });
UserModel.belongsTo(FilialModel, { foreignKey: "filialId", as: "filial" });

// Relaciones para ServicioModel
ServicioModel.belongsTo(CanalComunicacionModel, { foreignKey: "canalComunicacionId", as: "canalComunicacion" });
ServicioModel.belongsTo(SucursalModel, { foreignKey: "fo_Sucursal_otorgante_Id", as: "sucursalOtorgante" });
ServicioModel.belongsTo(SucursalModel, { foreignKey: "fo_Sucursal_Origen_Id", as: "sucursalOrigen" });
ServicioModel.belongsTo(TipoDocumentoModel, { foreignKey: "fo_Documento_Cliente_Id", as: "tipoDocumento" });
ServicioModel.belongsTo(StatusContratoModel, { foreignKey: "fori_Status_Contrato_Id", as: "statusContrato" });
ServicioModel.belongsTo(TipoServicioModel, { foreignKey: "fo_Tipo_Servicio_Id", as: "tipoServicio" });
ServicioModel.belongsTo(ConceptoModel, { foreignKey: "fo_Concepto_Id", as: "concepto" });
ServicioModel.belongsTo(EstadoCtaStatusModel, { foreignKey: "exp_Solicitud_Servicio_Status_id", as: "solicitudServicioStatus" });
ServicioModel.belongsTo(EstadoCtaStatusModel, { foreignKey: "exp_Comprobante_Pago_Status_Id", as: "comprobantePagoStatus" });
ServicioModel.belongsTo(EstadoCtaStatusModel, { foreignKey: "exp_Convenio_Status_Id", as: "convenioStatus" });
ServicioModel.belongsTo(MotivoNoOtorgadoModel, { foreignKey: "exp_Motivo_De_No_Otorgado_Id", as: "motivoNoOtorgado" });
ServicioModel.belongsTo(UserModel, { foreignKey: "Usuario_CapturaId", as: "usuarioCaptura" });
ServicioModel.belongsTo(PeriodoModel, { foreignKey: "PeriodoId", as: "periodo" });

ServicioModel.hasMany(ServicioObservacionModel, { foreignKey: "servicioId", as: "observaciones" });
ServicioObservacionModel.belongsTo(ServicioModel, { foreignKey: "servicioId", as: "servicio" });
ServicioObservacionModel.belongsTo(UserModel, { foreignKey: "usuarioId", as: "usuario" });

PeriodoModel.hasMany(CedulaModel, { foreignKey: "periodoId", as: "cedulas" });

CedulaModel.belongsTo(PeriodoModel, { foreignKey: "periodoId", as: "periodo" });
CedulaModel.belongsTo(FilialModel, { foreignKey: "filialId", as: "filial" });
CedulaModel.belongsTo(GrupoModel, { foreignKey: "grupoId", as: "grupo" });
CedulaModel.hasMany(CedulaDetalleModel, { foreignKey: "cedulaId", as: "detalles" });

CedulaDetalleModel.belongsTo(CedulaModel, { foreignKey: "cedulaId", as: "cedula" });
CedulaDetalleModel.belongsTo(ServicioModel, { foreignKey: "servicioId", as: "servicio" });
CedulaDetalleModel.belongsTo(SucursalModel, { foreignKey: "sucursalOrigenId", as: "sucursalOrigen" });
CedulaDetalleModel.belongsTo(SucursalModel, { foreignKey: "sucursalOtorganteId", as: "sucursalOtorgante" });

EstadoCuentaMovimientoModel.belongsTo(PeriodoModel, { foreignKey: "periodoId", as: "periodo" });
EstadoCuentaMovimientoModel.belongsTo(CedulaModel, { foreignKey: "cedulaId", as: "cedula" });
EstadoCuentaMovimientoModel.belongsTo(GrupoModel, { foreignKey: "grupoId", as: "grupo" });
EstadoCuentaMovimientoModel.belongsTo(FilialModel, { foreignKey: "filialId", as: "filial" });
EstadoCuentaMovimientoModel.belongsTo(SucursalModel, { foreignKey: "sucursalId", as: "sucursal" });
EstadoCuentaMovimientoModel.belongsTo(UserModel, { foreignKey: "usuarioId", as: "usuario" });
EstadoCuentaMovimientoModel.belongsTo(TipoMovimientoEstadoCuentaModel, { foreignKey: "tipoMovimientoId", as: "tipoMovimiento" });

GrupoModel.hasMany(EstadoCuentaMovimientoModel, { foreignKey: "grupoId", as: "movimientos" });
FilialModel.hasMany(EstadoCuentaMovimientoModel, { foreignKey: "filialId", as: "movimientos" });


export {
  UserModel,
  FilialModel,
  StatusContratoModel,
  TipoUsuarioModel,
  TipoDocumentoModel,
  TipoServicioModel,
  ConceptoModel,
  MotivoNoOtorgadoModel,
  EstadoCtaStatusModel,
  ServicioModel,
  PeriodoModel,
  CedulaModel,
  CedulaDetalleModel,
  EstadoCuentaMovimientoModel,
  TipoMovimientoEstadoCuentaModel,
  CostosModel,
  GrupoModel,
  SucursalModel,
  CanalComunicacionModel,
  ServicioObservacionModel,
  SettingsModel,
};
