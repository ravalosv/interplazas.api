import Joi from "joi";

const createIngresoEgresoSchema = Joi.object({
  eventoId: Joi.number().required(),
  tipoMovimiento: Joi.string().valid("Ingreso", "Egreso").required(),
  aportacion: Joi.number().optional(),
  gasto: Joi.number().optional(),
  idTipo: Joi.number().required(),
  idForma: Joi.number().optional(),
  idCuenta: Joi.number().optional(),
  idConcepto: Joi.number().optional(),
  idCategoria: Joi.number().optional(),
  referencia: Joi.string().optional(),
  idStatus: Joi.number().optional(),
  comentario: Joi.string().required(),
  comprobante: Joi.string().optional(),
  createdByUserId: Joi.number().required(),
});

const updateIngresoEgresoSchema = Joi.object({
  eventoId: Joi.number().optional(),
  tipoMovimiento: Joi.string().valid("Ingreso", "Egreso").optional(),
  aportacion: Joi.number().optional(),
  gasto: Joi.number().optional(),
  idTipo: Joi.number().optional(),
  idForma: Joi.number().optional(),
  idCuenta: Joi.number().optional(),
  idConcepto: Joi.number().optional(),
  idCategoria: Joi.number().optional(),
  referencia: Joi.string().optional(),
  idStatus: Joi.number().optional(),
  comentario: Joi.string().optional(),
  comprobante: Joi.string().optional(),
  createdByUserId: Joi.number().optional(),
});

export {
  createIngresoEgresoSchema,
  updateIngresoEgresoSchema,
};