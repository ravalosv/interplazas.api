import { Model, DataTypes } from 'sequelize';
import { ITipoMovimientoEstadoCuenta } from '../interfaces/tipo-movimiento-estado-cuenta.interface';

export class TipoMovimientoEstadoCuentaModel extends Model<ITipoMovimientoEstadoCuenta> implements ITipoMovimientoEstadoCuenta {
  public id!: number;
  public nombre!: string;
  public naturaleza!: 1 | -1;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initTipoMovimientoEstadoCuentaModel = (sequelize: any) => {
  TipoMovimientoEstadoCuentaModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      naturaleza: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[1, -1]]
        }
      },
    },
    {
      sequelize,
      tableName: 'tipo_movimientos_estado_cuenta',
    }
  );
};
