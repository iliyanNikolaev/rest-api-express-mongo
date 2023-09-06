const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    owner: { type: Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, max: 500, default: '', requred: true},
    image: { type: String, default: ''},
    likes: { type: [Types.ObjectId], default: [], ref: 'User' },
    comments: { type: [Object], default: []}
}, { timestamps: true });

const Post = model('Post', postSchema);

module.exports = Post;

