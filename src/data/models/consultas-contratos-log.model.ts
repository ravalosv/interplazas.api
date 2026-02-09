import { Model, DataTypes } from 'sequelize';
import { IConsultasContratosLog } from '../interfaces/consultas-contratos-log.interface';

export class ConsultasContratosLogModel extends Model<IConsultasContratosLog> implements IConsultasContratosLog {
  public id!: number;
  public filialId!: number;
  public apiUrl!: string;
  public resultado!: string;
  public usuarioId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initConsultasContratosLogModel = (sequelize: any) => {
  ConsultasContratosLogModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      filialId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "filiales",
            key: "id",
        }
      },
      apiUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resultado: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: "id",
        }
      },
    },
    {
      sequelize,
      modelName: 'ConsultasContratosLog',
      tableName: 'consultas_contratos_log',
      timestamps: true,
    }
  );
};
