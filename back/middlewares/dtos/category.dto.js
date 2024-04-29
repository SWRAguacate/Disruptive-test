const Joi = require('joi');

//CRITERIOS DE LOS CAMPOS
const idValidation = Joi.string();
const nameValidation = Joi.string().min(5).max(45);
const idContentTypeValidation = Joi.string();

//CASOS DE USO
//CREACIÓN
const createCategoryDto = Joi.object({
  name: nameValidation.required(),
  idContentType: idContentTypeValidation.required()
});

//ACTUALIZACIÓN
const updateCategoryDto = Joi.object({
  name: nameValidation,
  idContentType: idContentTypeValidation
});

//CUANDO REQUERIMOS UN ID
const getIdCategoryDto = Joi.object({
  id: idValidation.required(),
});

module.exports = { createCategoryDto, updateCategoryDto, getIdCategoryDto };
