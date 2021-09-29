const mongoose = require('mongoose');
var uniqueValitador = require('mongoose-unique-validator');
var slugf = require('slug');

const itemSchema = mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    name: String,
    desc: String,
    price: Number,
    categ: [String],
    ubication: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    liked: {type: Number, default: 0},
    viewed: {type: Number, default: 0},
    comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    wear: String,
    state: String,
    shipping: Boolean,
    img: [String]

}, {
    timestamps: true
});

itemSchema.plugin(uniqueValitador, {message: 'is already taken'});

itemSchema.pre('validate', function(next) {
    if (!this.slug) {
        this.slugify();
    }

    next();
});

itemSchema.methods.slugify = function() {
    this.slug = slugf(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};  

// favs

// viewed

itemSchema.methods.toJSONfor = function(item) {
    return {
        slug: this.slug,
        name: this.name,
        desc: this.desc,
        price: this.price,
        categ: this.categ,
        ubication: this.ubication,      
        liked: this.liked,
        viewed: this.viewed,
        comment: this.comment,
        author: this.author,
        publishDate: this.publishDate,
        wear: this.wear,
        state: this.state,
        shipping: this.shipping,
        img: this.img

    }
}


module.exports = mongoose.model('item', itemSchema);