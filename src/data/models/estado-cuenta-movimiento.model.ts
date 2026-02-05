import { Model, DataTypes } from 'sequelize';
import { IEstadoCuentaMovimiento } from '../interfaces/estado-cuenta-movimiento.interface';

export class EstadoCuentaMovimientoModel extends Model<IEstadoCuentaMovimiento> implements IEstadoCuentaMovimiento {
  public id!: number;
  public fecha!: Date | string;
  public tipoMovimientoId!: number | null;
  public montoMXN!: number;
  public montoUSD!: number;
  public montoMXNConSigno!: number;
  public montoUSDConSigno!: number;
  public periodoId!: number | null;
  public cedulaId!: number | null;
  public grupoId!: number | null;
  public filialId!: number | null;
  public sucursalId!: number | null;
  public observacion!: string;
  public referencia!: string;
  public usuarioId!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initEstadoCuentaMovimientoModel = (sequelize: any) => {
  EstadoCuentaMovimientoModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      tipoMovimientoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'tipo_movimientos_estado_cuenta', key: 'id' },
      },
      montoMXN: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      montoUSD: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      montoMXNConSigno: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      montoUSDConSigno: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      periodoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'periodos', key: 'id' },
      },
      cedulaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'cedulas', key: 'id' },
      },
      grupoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'grupos', key: 'id' },
      },
      filialId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'filiales', key: 'id' },
      },
      sucursalId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'sucursales', key: 'id' },
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referencia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
      },
    },
    {
      sequelize,
      tableName: 'estado_cuenta_movimientos',
    }
  );
};
