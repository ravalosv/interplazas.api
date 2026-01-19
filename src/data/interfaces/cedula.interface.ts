export interface ICedula {
  id?: number;
  periodoId: number;
  periodoNombre?: string;
  filialId: number;
  filialNombre?: string;
  grupoId?: number;
  grupoNombre?: string;
  totalFavor: number;
  totalPagar: number;
  totalUsa: number;
  totalNeto: number;
  comisionPF: number;
  saldosEfectivamenteCobradosFavor: number;
  saldosEfectivamenteCobradosPagar: number;
  saldosEfectivamenteCobradosTotal: number;
  totalFinal: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICedulaDetalle {
  id?: number;
  cedulaId: number;
  servicioId: number;
  tipo: 'FAVOR' | 'PAGAR' | 'USA';
  sucursalOrigenId: number;
  sucursalOrigenNombre: string;
  sucursalOtorganteId: number;
  sucursalOtorganteNombre: string;
  titular: string;
  finado: string;
  contrato: string;
  fecha: Date;
  conceptoId: number;
  conceptoNombre: string;
  monto: number;
  saldoPABS: number;
  observacion?: string;
  saldoEfectivamenteCobrado: number;
  createdAt?: Date;
  updatedAt?: Date;
}
