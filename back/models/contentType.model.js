const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentTypeSchema = new Schema({
  _id: String,
  name: String
});

const model = mongoose.model('contentType', contentTypeSchema);
module.exports = model
