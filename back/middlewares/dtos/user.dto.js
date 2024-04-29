const Joi = require('joi');

//CRITERIOS DE LOS CAMPOS
const idValidation = Joi.string();
const usernameValidation = Joi.string().min(5).max(45);
const mailValidation = Joi.string().email();
const passValidation = Joi.string();
const roleValidation = Joi.string();

//CASOS DE USO
//CREACIÓN
const createUserDto = Joi.object({
  username: usernameValidation.required(),
  email: mailValidation.required(),
  password: passValidation.required(),
  idRole: roleValidation.required()
});

//ACTUALIZACIÓN
const updateUserDto = Joi.object({
  username: usernameValidation,
  email: mailValidation,
  password: passValidation,
  idRole: roleValidation
});

//CUANDO REQUERIMOS UN ID
const getIdUserDto = Joi.object({
  id: idValidation.required(),
});

//LOGIN
const loginUserDto = Joi.object({
  username: usernameValidation.required(),
  password: passValidation.required()
});

module.exports = { createUserDto, updateUserDto, getIdUserDto, loginUserDto };
