export interface ICedula {
  id?: number;
  periodoId: number;
  filialId: number;
  totalFavor: number;
  totalPagar: number;
  totalUsa: number;
  totalNeto: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICedulaDetalle {
  id?: number;
  cedulaId: number;
  servicioId: number;
  tipo: 'FAVOR' | 'PAGAR' | 'USA';
  monto: number;
  filialOrigenId: number;
  filialOtorganteId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
