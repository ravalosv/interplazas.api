export interface IGrupo {
  id?: number;
  nombre: string;
  cobroEntreFiliales: boolean;
  cedula_destinatarios_email?: string;
  cedula_template_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
