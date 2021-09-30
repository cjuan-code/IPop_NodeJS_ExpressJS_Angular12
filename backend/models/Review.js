const mongoose = require('mongoose');


const ReviewSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'item'},
    valoration: Number
});

module.exports = mongoose.model('review', ReviewSchema);