const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    owner: { type: String, required: true },
    content: { type: String, max: 500, default: ''},
    image: { type: String, default: ''},
    likes: { type: Array, default: []}
}, { timestamps: true });

const Post = model('Post', postSchema);

module.exports = Post;

