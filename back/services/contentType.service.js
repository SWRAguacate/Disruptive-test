const boom = require('@hapi/boom');
const ContentTypeModel = require('../models/contentType.model.js');
const mongoose = require('mongoose');

class ContentTypeService
{
  constructor() {}

  async findDB(limit, filter) {
    let contentTypesDB = await ContentTypeModel.find(filter);
    contentTypesDB = limit ? contentTypesDB.filter((item, index) => item && index < limit) : contentTypesDB;
    return contentTypesDB;
  }

  async findOneDB(id) {
    const contentType = await ContentTypeModel.findOne({
      _id: id
    });

    if(contentType == undefined || contentType == null)
     throw boom.notFound('Tipo de contenido no encontrado');
    else if (contentType.length <= 0)
     throw boom.notFound('Tipo de contenido no existe');

    return contentType;
  }

  async createDB(data) {
    data._id = new mongoose.Types.ObjectId();
    const contentType_model = new ContentTypeModel(data);
    const savedContentType = await contentType_model.save();
    return savedContentType;
  }

  async updateDB(id, changes) {
    let contentType = await ContentTypeModel.findOne({
      _id: id
    });
    let contentTypeOriginal = {
      name: contentType.name
    };
    const { name } = changes;
    contentType.name = name || contentType.name;
    contentType.save();

    return {
      original: contentTypeOriginal,
      actualizado: contentType
    }
  }

  async deleteDB(id){
    let contentType_model = await ContentTypeModel.findOne({
      _id: id
    });

    const { deletedCount } = await ContentTypeModel.deleteOne({
      _id: id
    });

    if(deletedCount <= 0)
      throw boom.notFound('El tipo de contenido seleccionado no existe');

    return contentType_model;
  }
}

module.exports = ContentTypeService;
