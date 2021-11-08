const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'item'},
    content: String,
}, {timestamps: true});

CommentSchema.methods.toJSONFor = function(user){
    return {
      id: this._id,
      content: this.content,
      createdAt: this.createdAt,
      author: this.author.toProfileJSONFor(user)
    };
  };

module.exports = mongoose.model('comment', CommentSchema);