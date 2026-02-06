export interface IFilial {
  id?: number;
  nombre: string;
  grupoId: number;
  extranjera: boolean;
  utilizaApi: boolean;
  apiUrl?: string;
  apiKey?: string;
}
