const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const COVID19 = new Schema({
  success: Boolean,
  vietnam: Object,
  global: Object
}, { collection: 'COVID-19' });
const MyModel = mongoose.model('COVID-19', COVID19);

module.exports = MyModel;