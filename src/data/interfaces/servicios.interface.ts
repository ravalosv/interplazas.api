export interface IServicio {
  id?: number;
  canalComunicacionId: number | null;
  fo_Sucursal_otorgante_Id: number; // SucursalModel
  fo_Sucursal_Origen_Id: number; // SucursalModel
  fo_Contrato: string;
  fo_Nombre_Titular: string;
  fo_Nombre_Finado: string;
  fo_Documento_Cliente_Id: number;
  fo_Documento_Cliente_url: string;
  fo_Monto_devuelto_documento_url: string;
  fo_Monto_Devuelto: number;
  fo_Jefe_Turno_Nombre: string;
  fo_Jefe_Turno_Puesto: string;
  fo_Jefe_Turno_WhatsApp: string;
  fo_Fecha_Servicio: Date;
  fori_Status_Contrato_Id: number; // StatusModel
  fori_Saldo_Contrato: number;
  fori_Acepta_Convenio: boolean;
  fori_Otorga_Info_Nombre: string;
  fori_Otorga_Info_Puesto: string;
  fori_Otorga_Info_Telefono: string;
  fo_Contrato_Monto_Recuperado: number;
  fo_Contrato_Monto_Convenio: number;
  fo_Tipo_Servicio_Id: number; // TipoServicioModel
  fo_Concepto_Id: number; // ConceptoModel
  exp_Solicitud_Servicio_Status_id: number; // EstadoCtaStatusModel  
  exp_Solicitud_Servicio_url: string;
  exp_Comprobante_Pago_Status_Id: number;   // EstadoCtaStatusModel
  exp_Comprobante_Pago_url: string;
  exp_Convenio_Status_Id: number; // EstadoCtaStatusModel
  exp_Convenio_url: string;
  exp_Enviado_Grupo_Whats: boolean;
  exp_Motivo_De_No_Otorgado_Id: number | null; // MotivoNoOtorgadoModel
  exp_Expediente_Completo: string;
  exp_Observaciones_cierre: string;
  penalizado: boolean;
  exp_ine_responsable_url?: string;
  exp_comprobante_domicilio_resp_url?: string;
  exp_ine_aval_url?: string;
  fori_estado_cuenta_url?: string;
  PeriodoId: number;
  Usuario_CapturaId: number;
  Fecha_Captura: Date;
}
