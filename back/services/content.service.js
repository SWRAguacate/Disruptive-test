const boom = require('@hapi/boom');
const ContentModel = require('../models/content.model.js');
const mongoose = require('mongoose');

class ContentService
{
  constructor() {}

  async findDB(limit, filter) {
    let content = await ContentModel.find(filter);
    content = limit ? content.filter((item, index) => item && index < limit) : content;
    return content;
  }

  async findOneDB(id) {
    const content = await ContentModel.findOne({
      _id: id
    });

    if(content == undefined || content == null)
     throw boom.notFound('Contenido no encontrado');
    else if (content.length <= 0)
     throw boom.notFound('Contenido no existente');

    return content;
  }

  async findSearchDB(filter) {
    try {
      const nombreRegex = new RegExp(filter.servicio, 'i');
      const content = await ContentModel.find({ servicio: { $regex: nombreRegex } });
      if (!content || content.length === 0) {
        throw boom.notFound('No se encontraron contenidos');
      }
      return content;
    } catch (error) {
      throw boom.badRequest('Error al buscar contenidos', error);
    }
  }

  async findCategoriesWithCounts() {
    try {
      const categoriesWithCounts = await ContentModel.aggregate([
        {
          $group: {
            _id: '$_id',
            idCategory: '$idCategory',
            name: { $first: '$name' },
            conteoImagenes: { $sum: { $cond: { if: { $eq: ['$idContentType', 'IMG'] }, then: 1, else: 0 } } },
            conteoVideos: { $sum: { $cond: { if: { $eq: ['$idContentType', 'URL'] }, then: 1, else: 0 } } },
            conteoTextos: { $sum: { $cond: { if: { $eq: ['$idContentType', 'TXT'] }, then: 1, else: 0 } } }
          }
        }
      ]);

      return categoriesWithCounts;
    } catch (error) {
      throw boom.badRequest('Error al buscar contenido por categorías', error);
    }
  }

  async createDB(data) {
    data._id = new mongoose.Types.ObjectId();
    const content_model = new ContentModel(data);
    const savedContent = await content_model.save();
    return savedContent;
  }

  async updateDB(id, changes) {
    let content = await ContentModel.findOne({
      _id: id
    });
    let contentOriginal = {
      name: content.name,
      idContentType: content.idContentType,
      idCategory: content.idCategory,
      resource: content.resource,
      credits: content.credits,
      creationDate: content.creationDate
    };
    const { name, idContentType, idCategory, resource, credits, creationDate } = changes;
    content.name = name || content.name;
    content.idContentType = idContentType || content.idContentType;
    content.idCategory = idCategory || content.idCategory;
    content.resource = resource || content.resource;
    content.credits = credits || content.credits;
    content.creationDate = creationDate || content.creationDate;
    content.save();

    return {
      original: contentOriginal,
      actualizado: content
    }
  }

  async deleteDB(id){
    let Content_model = await ContentModel.findOne({
      _id: id
    });

    const { deletedCount } = await ContentModel.deleteOne({
      _id: id
    });

    if(deletedCount <= 0)
      throw boom.notFound('El Contenido seleccionado no existe');

    return Content_model;
  }
}

module.exports = ContentService;
