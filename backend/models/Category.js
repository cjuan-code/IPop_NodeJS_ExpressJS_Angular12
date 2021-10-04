const mongoose = require('mongoose');
var uniqueValitador = require('mongoose-unique-validator');
var slugf = require('slug');

const CategorySchema = mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    name: String,
    img: String
});

CategorySchema.plugin(uniqueValitador, {message: "already exists."});

CategorySchema.pre('validate', function(next) {
    if (!this.slug) {
        this.slugify();
    }

    next();
});

CategorySchema.methods.slugify = function() {
    this.slug = slugf(this.name) + '-segunda-mano';
};  

module.exports = mongoose.model('category', CategorySchema);