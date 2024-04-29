const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  _id: String,
  name: String,
  permissions: String
});

const model = mongoose.model('profile', profileSchema);
module.exports = model
