const boom = require('@hapi/boom');
const UsuarioModel = require('../models/user.model.js');
const mongoose = require('mongoose');

class UserService
{
  constructor() {}

  async findDB(limit, filter) {
    let usersDB = await UsuarioModel.find(filter);
    usersDB = limit ? usersDB.filter((item, index) => item && index < limit) : usersDB;
    return usersDB;
  }

  async findOneDB(id) {
    const user = await UsuarioModel.findOne({
      _id: id
    });

    if(user == undefined || user == null)
     throw boom.notFound('Usuario no encontrado');
    else if (user.length <= 0)
     throw boom.notFound('Usuario no existente');

    return user;
  }

  async loginDB(data) {
    const { username, password } = data;
    const user = await UsuarioModel.findOne({
      username: username,
      password: password
    });

    if(user == undefined || user == null)
     throw boom.notFound('Usuario no encontrado');
    else if (user.length <= 0)
     throw boom.notFound('Usuario no existente');

    return user;
  }

  async validateMail(data) {
    const { email } = data;
    const user = await UsuarioModel.findOne({
      email: email
    });

    return user;
  }

  async validateUsername(data) {
    const { username } = data;
    const user = await UsuarioModel.findOne({
      username: username
    });

    return user;
  }

  async createDB(data) {
    data._id = new mongoose.Types.ObjectId();
    const user = await this.validateMail(data);
    if(user == null || user == undefined){
      const username = await this.validateUsername(data);
      if(username == null || username == undefined){
        const user_model = new UsuarioModel(data);
        await user_model.save();
        const registered = await this.loginDB(data);
        return registered;
      } else {
        throw boom.notAcceptable('Usuario no disponible');
      }
    } else {
      throw boom.notAcceptable('Correo no disponible');
    }
  }

  async updateDB(id, changes) {
    let user = await UsuarioModel.findOne({
      _id: id
    });
    let userOriginal = {
      username: user.username,
      email: user.email,
      password: user.password,
      idRole: user.idRole
    };
    const { username, email, password, idRole } = changes;
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.idRole = idRole || user.idRole;
    user.save();

    return {
      original: userOriginal,
      actualizado: user
    }
  }

  async deleteDB(id){
    let user_model = await UsuarioModel.findOne({
      _id: id
    });

    const { deletedCount } = await UsuarioModel.deleteOne({
      _id: id
    });

    if(deletedCount <= 0)
      throw boom.notFound('El usuario seleccionado no existe');

    return user_model;
  }
}

module.exports = UserService;
