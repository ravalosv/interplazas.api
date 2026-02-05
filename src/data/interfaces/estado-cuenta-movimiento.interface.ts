export interface IEstadoCuentaMovimiento {
  id?: number;
  fecha: Date | string;
  tipoMovimientoId?: number | null;
  montoMXN: number;
  montoUSD: number;
  montoMXNConSigno: number;
  montoUSDConSigno: number;
  periodoId?: number | null;
  cedulaId?: number | null;
  grupoId?: number | null;
  filialId?: number | null;
  sucursalId?: number | null;
  observacion?: string;
  referencia?: string;
  usuarioId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
