export interface IPeriodo {
  id?: number;
  mes: number;
  anio: number;
  nombre: string; // E.g., "ENERO 2025"
  activo: boolean; // Para futuro control de cierre de periodos
  estadoCuentaGenerado: boolean;
  createdAt?: Date;
}
