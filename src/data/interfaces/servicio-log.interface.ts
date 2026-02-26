export interface IServicioLog {
  id?: number;
  servicioId: number;
  usuarioId: number;
  fecha: Date;
  accion: string;
  detalles: string;
}
