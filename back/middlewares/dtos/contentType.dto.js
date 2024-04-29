const Joi = require('joi');

//CRITERIOS DE LOS CAMPOS
const idValidation = Joi.string();
const nameValidation = Joi.string().min(5).max(45);

//CASOS DE USO
//CREACIÓN
const createContentTypeDto = Joi.object({
  name: nameValidation.required(),
});

//ACTUALIZACIÓN
const updateContentTypeDto = Joi.object({
  name: nameValidation,
});

//CUANDO REQUERIMOS UN ID
const getIdContentTypeDto = Joi.object({
  id: idValidation.required(),
});

module.exports = { createContentTypeDto, updateContentTypeDto, getIdContentTypeDto };
