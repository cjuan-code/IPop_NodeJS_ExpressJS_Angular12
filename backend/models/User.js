const mongoose = require('mongoose');
var uniqueValitador = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config({path: 'var.env'});
var secret = process.env.SECRET;

const UserSchema = mongoose.Schema({
    username: {type: String, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    mail: {type: String, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String,
    bio: String,
    publishedItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'item'}],
    favItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'item'}], // que es millor? Guardar els items per a pintar o array i despres agafar els items al pintar
    profileImg: String,
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    hash: String,
    pssval: String
});

UserSchema.plugin(uniqueValitador, {message: "is already taken."});


UserSchema.methods.setPass = function(pass) {
    this.pssval = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(pass, this.pssval, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(pass) {
    var hash = crypto.pbkdf2Sync(pass, this.pssval, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);

    exp.setDate(today.getDate() + 60);

    return jwt.sign({id: this._id, username: this.username, exp: parseInt(exp.getTime() / 1000)}, secret);
};

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        mail: this.mail,
        token: this.generateJWT(),
        bio: this.bio,
        profileImg: this.profileImg,
        following: this.following
    };
};
  
UserSchema.methods.toProfileJSONFor = function(user){
    return {
        username: this.username,
        bio: this.bio,
        profileImg: this.profileImg,
        following: this ? this.isFollowing(user._id) : false
    };
};

// fav
UserSchema.methods.favorite = function(id){
    if(this.favItems.indexOf(id) === -1){
      this.favItems.push(id);
    }
  
    return this.save();
};

// unfav
UserSchema.methods.unfavorite = function(id){
    this.favItems.remove(id);
    return this.save();
};

// is fav
UserSchema.methods.isFavorite = function(id){
    return this.favItems.some(function(favoriteId){
      return favoriteId.toString() === id.toString();
    });
};

// follow
UserSchema.methods.follow = function(id){
    if(this.following.indexOf(id) === -1){
      this.following.push(id);
    }
  
    return this.save();
};

// unfollow
UserSchema.methods.unfollow = function(id){
    this.following.remove(id);
    return this.save();
};

// is following
UserSchema.methods.isFollowing = function(id){
    return this.following.some(function(followId){
        return followId.toString() === id.toString();
    });
}

module.exports = mongoose.model('user', UserSchema);