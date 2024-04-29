const Joi = require('joi');

//CRITERIOS DE LOS CAMPOS
const idValidation = Joi.string();
const nameValidation = Joi.string().min(5).max(45);
const idContentTypeValidation = Joi.string();
const idCategoryValidation = Joi.string();
const resourceValidation = Joi.string();
const creditsValidation = Joi.string();
const creationDateValidation = Joi.string();

//CASOS DE USO
//CREACIÓN
const createContentDto = Joi.object({
  name: nameValidation.required(),
  idContentType: idContentTypeValidation.required(),
  idCategory: idCategoryValidation.required(),
  resource: resourceValidation.required(),
  credits: creditsValidation.required(),
  creationDate: creationDateValidation.required()
});

//ACTUALIZACIÓN
const updateContentDto = Joi.object({
  name: nameValidation,
  idContentType: idContentTypeValidation,
  idCategory: idCategoryValidation,
  resource: resourceValidation,
  credits: creditsValidation,
  creationDate: creationDateValidation
});

//CUANDO REQUERIMOS UN ID
const getIdContentDto = Joi.object({
  id: idValidation.required(),
});

module.exports = { createContentDto, updateContentDto, getIdContentDto };
