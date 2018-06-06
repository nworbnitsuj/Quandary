/// Creates mongoose schema 'QuandarySchema' ///
var mongoose = require('mongoose');

var QuandarySchema = new mongoose.Schema({
  quandary: String,
  pros: String,
  cons: String,
});

module.exports = mongoose.model('Quandary', QuandarySchema);
