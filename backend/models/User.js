const mongoose = require('mongoose');
var uniqueValitador = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    mail: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String,
    bio: String,
    publishedItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'item'}],
    favItems: [String], // que es millor? Guardar els items per a pintar o array i despres agafar els items al pintar
    profileImg: String,
    tlf: String,
    favUsers: [String],
    ubication: String
});

UserSchema.plugin(uniqueValitador, {message: "is already taken."});

// fav

// unfav

// is fav

// follow 

// unfollow

// is follow

module.exports = mongoose.model('user', UserSchema);