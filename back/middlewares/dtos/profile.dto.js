const Joi = require('joi');

//CRITERIOS DE LOS CAMPOS
const idValidation = Joi.string();
const nameValidation = Joi.string().min(5).max(45);
const permissionsValidation = Joi.string();

//CASOS DE USO
//CREACIÓN
const createProfileDto = Joi.object({
  name: nameValidation.required(),
  permissions: permissionsValidation.required()
});

//ACTUALIZACIÓN
const updateProfileDto = Joi.object({
  name: nameValidation,
  permissions: permissionsValidation
});

//CUANDO REQUERIMOS UN ID
const getIdProfileDto = Joi.object({
  id: idValidation.required(),
});

module.exports = { createProfileDto, updateProfileDto, getIdProfileDto };
