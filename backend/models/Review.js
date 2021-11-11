const mongoose = require('mongoose');


const ReviewSchema = mongoose.Schema({
    valoration: Number
});

module.exports = mongoose.model('review', ReviewSchema);