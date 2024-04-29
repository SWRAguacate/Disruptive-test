const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: String,
  username: String,
  email: String,
  password: String,
  idRole: String
});

const model = mongoose.model('user', userSchema);
module.exports = model
