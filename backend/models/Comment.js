const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'item'},
    content: String,
    review : {type: mongoose.Schema.Types.ObjectId, ref: 'review'}
}, {timestamps: true});

CommentSchema.methods.toJSONFor = function(user){
    return {
      id: this._id,
      content: this.content,
      createdAt: this.createdAt,
      author: this.author.toProfileJSONFor(user),
      review: this.review
    };
  };

module.exports = mongoose.model('comment', CommentSchema);