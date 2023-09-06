const { Schema, model, Types } = require('mongoose');

const commentSchema = new Schema({
    owner: { type: Types.ObjectId, require: true, ref: 'User'},
    post: { type: String, require: true },
    content: { type: String, require: true, max: 300 },
    likes: { type: [Types.ObjectId], default: [], ref: 'User'}
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;