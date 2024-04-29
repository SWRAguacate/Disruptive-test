const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: String,
  name: String,
  idContentType: String
});

const model = mongoose.model('category', categorySchema);
module.exports = model
