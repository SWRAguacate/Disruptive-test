const boom = require('@hapi/boom');
const ProfileModel = require('../models/profile.model.js');
const mongoose = require('mongoose');

class ProfileService
{
  constructor() {}

  async findDB(limit, filter) {
    let profilesDB = await ProfileModel.find(filter);
    profilesDB = limit ? profilesDB.filter((item, index) => item && index < limit) : profilesDB;
    return profilesDB;
  }

  async findOneDB(id) {
    const profile = await ProfileModel.findOne({
      _id: id
    });

    if(profile == undefined || profile == null)
     throw boom.notFound('Perfil no encontrado');
    else if (profile.length <= 0)
     throw boom.notFound('Perfil no existe');

    return profile;
  }

  async createDB(data) {
    data._id = new mongoose.Types.ObjectId();
    const profile_model = new ProfileModel(data);
    const savedProfile = await profile_model.save();
    return savedProfile;
  }

  async updateDB(id, changes) {
    let profile = await ProfileModel.findOne({
      _id: id
    });
    let profileOriginal = {
      name: profile.name,
      permissions: profile.permissions
    };
    const { name, permissions } = changes;
    profile.name = name || profile.name;
    profile.permissions = permissions || profile.permissions;
    profile.save();

    return {
      original: profileOriginal,
      actualizado: profile
    }
  }

  async deleteDB(id){
    let profile_model = await ProfileModel.findOne({
      _id: id
    });

    const { deletedCount } = await ProfileModel.deleteOne({
      _id: id
    });

    if(deletedCount <= 0)
      throw boom.notFound('El perfil seleccionado no existe');

    return profile_model;
  }
}

module.exports = ProfileService;
