import Joi from "joi";

export const addGrupo = Joi.object({
  nombre: Joi.string().required(),
});

export const addUnidadNegocio = Joi.object({
  nombre: Joi.string().required(),
});

export const addFilial = Joi.object({
  nombre: Joi.string().required(),
});
