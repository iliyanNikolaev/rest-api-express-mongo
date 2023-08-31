const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    owner: { type: String, required: true },
    ownerProfilePic: { type: String, default: '/assets/profile-pic.png'},
    content: { type: String, max: 500, default: '', requred: true},
    image: { type: String, default: ''},
    likes: { type: Array, default: []},
    comments: { type: Array, default: []}
}, { timestamps: true });

const Post = model('Post', postSchema);

module.exports = Post;

