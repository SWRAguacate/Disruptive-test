const boom = require('@hapi/boom');
const CategoryModel = require('../models/category.model.js');
const mongoose = require('mongoose');

class CategoryService
{
  constructor() {}

  async findDB(limit, filter) {
    let categoriesDB = await CategoryModel.find(filter);
    categoriesDB = limit ? categoriesDB.filter((item, index) => item && index < limit) : categoriesDB;
    return categoriesDB;
  }

  async findOneDB(id) {
    const category = await CategoryModel.findOne({
      _id: id
    });

    if(category == undefined || category == null)
     throw boom.notFound('Categoría no encontrada');
    else if (category.length <= 0)
     throw boom.notFound('Categoría no existe');

    return category;
  }

  async createDB(data) {
    data._id = new mongoose.Types.ObjectId();
    const category_model = new CategoryModel(data);
    const savedProspect = await category_model.save();
    return savedProspect;
  }


  async updateDB(id, changes) {
    let category = await CategoryModel.findOne({
      _id: id
    });
    let categoryOriginal = {
      name: category.name,
      idContentType: category.idContentType
    };
    const { name, idContentType } = changes;
    category.name = name || category.name;
    category.idContentType = idContentType || category.idContentType;
    category.save();

    return {
      original: categoryOriginal,
      actualizado: category
    }
  }

  async deleteDB(id){
    let category_model = await CategoryModel.findOne({
      _id: id
    });

    const { deletedCount } = await CategoryModel.deleteOne({
      _id: id
    });

    if(deletedCount <= 0)
      throw boom.notFound('La categoría seleccionada no existe');

    return category_model;
  }
}

module.exports = CategoryService;
