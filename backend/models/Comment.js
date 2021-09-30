const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'item'},
    content: String,
    review: {type: mongoose.Schema.Types.ObjectId, ref: 'review'}
});

module.exports = mongoose.model('comment', CommentSchema);