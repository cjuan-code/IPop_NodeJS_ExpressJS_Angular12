const mongoose = require('mongoose');
var uniqueValitador = require('mongoose-unique-validator');

const CategorySchema = mongoose.Schema({
    name: String,
    img: String
});

CategorySchema.plugin(uniqueValitador, {message: "already exists."});

module.exports = mongoose.model('category', CategorySchema);