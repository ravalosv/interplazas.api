export interface IPeriodo {
  id?: number;
  mes: number;
  anio: number;
  nombre: string; // E.g., "ENERO 2025"
  activo: boolean; // Para futuro control de cierre de periodos
  estadoCuentaGenerado: boolean;
  fecha_revision?: string;
  fecha_reenvio_cedulas?: string;
  fecha_visto_bueno?: string;
  fecha_cierre_periodo?: string;
  createdAt?: Date;
}
