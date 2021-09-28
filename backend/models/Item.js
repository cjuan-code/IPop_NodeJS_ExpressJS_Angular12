const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: String,
    desc: String,
    price: Number,
    ubication: String,
    img: [String],
    viewed: Number,
    liked: Number

}, {
    timestamps: true
});

module.exports = mongoose.model('item', itemSchema);