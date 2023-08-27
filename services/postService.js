//models
const Post = require('../models/Post');
const User = require('../models/User');

async function createPost(data) {
    try {
        const created = await Post.create(data);

        return created;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function editPostById(postId, postData) {
    try {
        await Post.findByIdAndUpdate(postId, postData);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function deletePostById(postId) {
    try {
        await Post.findByIdAndDelete(postId);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getPostById(postId) {
    try {
        const post = await Post.findById(postId);

        return post;
    } catch (err) {
        throw new Error('This post not exist');
    }
}

async function getAllPostFromCurrentUser(userId) {
    try {
        const posts = await Post.find({ owner: userId });

        return posts;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getNewsFeedPosts(userId) {
    try {
        let posts = [];

        const currentUser = await User.findById(userId);

        const followings = currentUser.followings;

        for (const id of followings) {
            const currentPosts = await getAllPostFromCurrentUser(id);

            posts = posts.concat(currentPosts);
        }

        return posts;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function likePost(userId, postId) {
    try {
        const currentPost = await Post.findById(postId);
        
        if(currentPost.likes.includes(userId)) {
            throw new Error('You already liked this post!')
        }

        await currentPost.updateOne({ $push: { likes: userId }});
    } catch (err) {
        throw new Error(err.message);
    }
}

async function unlikePost(userId, postId) {
    try {
        const currentPost = await Post.findById(postId);
        
        if(!currentPost.likes.includes(userId)) {
            throw new Error('You dont\'t like this post!')
        }

        await currentPost.updateOne({ $pull: { likes: userId }});
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    createPost,
    getPostById,
    editPostById,
    deletePostById,
    getAllPostFromCurrentUser,
   getNewsFeedPosts,
    likePost,
    unlikePost
}