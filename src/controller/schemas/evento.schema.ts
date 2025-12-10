import Joi from "joi";

const nuevoEventoSchema = Joi.object({
  nombre: Joi.string().required(),
  fechaLimite: Joi.date().required(),
  tipoFormulario: Joi.string().valid("1", "2").required(),
  fechaInicio: Joi.date().required(),
  fechaFin: Joi.date().required(),
  capacidadMaxima: Joi.number().required(),
});

const updateEventoSchema = Joi.object({
  id: Joi.number().required(),
  nombre: Joi.string().required(),
  fechaLimite: Joi.date().required(),
  tipoFormulario: Joi.string().valid("1", "2").required(),
  fechaInicio: Joi.date().required(),
  fechaFin: Joi.date().required(),
  capacidadMaxima: Joi.number().required(),
});

const addGroupToEventSchema = Joi.object({
  grupoId: Joi.number().required(),
  invitados: Joi.number().required(),
});

const addTipoHabitacionToEventSchema = Joi.object({
  tipoHabitacion: Joi.string().required(),
  descripcion: Joi.string().required(),
  cantidad: Joi.number().required(),
  minimo: Joi.number().required(),
  maximo: Joi.number().required(),
  reserva: Joi.number().required(),
});

const addTipoMesaToEventSchema = Joi.object({
  tipo: Joi.string().required(),
  descripcion: Joi.string().required(),
  cantidad: Joi.number().required(),
  maximo: Joi.number().required(),
  reserva: Joi.number().required(),
});

const addInvitadoToEventoSchema = Joi.object({
  eventoId: Joi.number().required(),
  grupoId: Joi.number().required(),
  unidadNegocioId: Joi.number().required(),
  filialId: Joi.number().required(),
  nombre: Joi.string().required(),
  edad: Joi.string().required(),
  tipoInvitado: Joi.string().valid("Colaborador", "Externo").required(),
  fechaIngreso: Joi.string().allow(null),
  requiereTransporte: Joi.bool().required(),
  participaEnRifa: Joi.bool().required(),
  creditoSolarum: Joi.bool().required(),
  requiereHospedaje: Joi.bool().required(),
  origen: Joi.string().allow(null, ""),
  destino: Joi.string().allow(null, ""),
  comentarios: Joi.string().allow(null, ""),
  relacionarConOtroEvento: Joi.bool(),
  eventoRelacionadoId: Joi.number().allow(null),
  fechaEstanciaInicio: Joi.date().allow(null),
  fechaEstanciaFin: Joi.date().allow(null),
  fechaHospedajeInicio: Joi.date().allow(null),
  fechaHospedajeFin: Joi.date().allow(null),
});

export {
  nuevoEventoSchema,
  updateEventoSchema,
  addGroupToEventSchema,
  addTipoHabitacionToEventSchema,
  addInvitadoToEventoSchema,
  addTipoMesaToEventSchema,
};
