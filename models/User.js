const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    password: { type: String, required: true, min: 6, max: 30 },
    profilePicture: { type: String, default: '/assets/profile-pic.png' },
    coverPicture: { type: String, default: '/assets/empty-cover.png' },
    followers: { type: [Types.ObjectId], default: [], ref: 'User' },
    followings: { type: [Types.ObjectId], default: [], ref: 'User'  }
}, { timestamps: true});

const User = model('User', userSchema);

module.exports = User;