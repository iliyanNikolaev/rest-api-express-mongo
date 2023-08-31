const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    password: { type: String, required: true, min: 6, max: 30 },
    profilePicture: { type: String, default: '' },
    coverPicture: { type: String, default: '' },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] }
}, { timestamps: true});

const User = model('User', userSchema);

module.exports = User;