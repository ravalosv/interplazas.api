export interface IFilial {
  id?: number;
  nombre: string;
  grupoId: number;
  extranjera: boolean;
  utilizaApi: boolean;
  apiUrl?: string;
  apiKey?: string;
  templateSaldoPabsCero?: number;
  templateSaldoPabsConConvenio?: number;
  templateSaldoPabsSinConvenio?: number;
  templateSaldoPabsParcial?: number;
  destinatarios_email?: string;
}
