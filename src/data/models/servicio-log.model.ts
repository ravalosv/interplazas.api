import { DataTypes, Model } from "sequelize";
import interDB from "../../core/dbconfig/mariadb";
import { IServicioLog } from "../interfaces/servicio-log.interface";

class ServicioLogModel extends Model<IServicioLog> implements IServicioLog {
  public id!: number;
  public servicioId!: number;
  public usuarioId!: number;
  public fecha!: Date;
  public accion!: string;
  public detalles!: string;
}

const initServicioLogModel = () => {
  ServicioLogModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      servicioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "servicios",
          key: "id",
        },
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      accion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detalles: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize: interDB,
      modelName: "ServicioLog",
      tableName: "servicios_logs",
      timestamps: false,
    }
  );
};

export { ServicioLogModel, initServicioLogModel };
