export interface IEstadoCuentaMovimiento {
  id?: number;
  fecha: Date | string;
  tipoMovimientoId?: number | null;
  montoMXNAbs: number;
  montoUSDAbs: number;
  montoMXN: number;
  montoUSD: number;
  periodoId?: number | null;
  cedulaId?: number | null;
  grupoId?: number | null;
  filialId?: number | null;
  sucursalId?: number | null;
  grupoNombre?: string | null;
  filialNombre?: string | null;
  sucursalNombre?: string | null;
  observacion?: string;
  referencia?: string;
  comprobanteUrl?: string | null;
  usuarioId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
