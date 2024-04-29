const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  _id: String,
  name: String,
  idContentType: String,
  idCategory: String,
  resource: String,
  credits: String,
  creationDate: String
});

const model = mongoose.model('content', contentSchema);
module.exports = model
