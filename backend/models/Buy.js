const mongoose = require('mongoose');

const BuySchema = mongoose.Schema({
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'item'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    price: String
});

module.exports = mongoose.model('buy', BuySchema);