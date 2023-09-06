//models
const Post = require('../models/Post');
const User = require('../models/User');

async function createPost(data) {
    try {
        const created = await Post.create(data);
        const ownerProps = await User.findById(created.owner).select(['_id', 'username', 'profilePicture']);

        created['owner'] = ownerProps;

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
        const post =
            await Post.findById(postId)
                .populate({ path: 'owner', select: ['username', 'profilePicture', '_id'], model: User })
                .populate({ path: 'likes', select: ['username', 'profilePicture', '_id'], model: User })

        return post;
    } catch (err) {
        throw new Error('This post not exist');
    }
}

async function getAllPostFromCurrentUser(userId) {
    try {
        const posts =
            await Post.find({ owner: userId })
                .populate({ path: 'owner', select: ['username', 'profilePicture', '_id'], model: User })
                .populate({ path: 'likes', select: ['username', 'profilePicture', '_id'], model: User })
                .sort({ createdAt: -1 });

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

        if (posts.length == 0) {
            posts = await getFirstTenPosts();
        } else {
            const ownPosts = await getAllPostFromCurrentUser(userId);

            posts = posts.concat(ownPosts);
        }

        return posts.sort(() => Math.random() < 0.5 ? 1 : -1);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getFirstTenPosts() {
    try {
        const posts =
            await Post.find({})
                .populate({ path: 'owner', select: ['username', 'profilePicture', '_id'], model: User })
                .populate({ path: 'likes', select: ['username', 'profilePicture', '_id'], model: User })
                .limit(10)
                .sort({ createdAt: -1 });

        return posts.sort(() => Math.random() < 0.5 ? 1 : -1);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function likeUnlikePost(userId, postId) {
    try {
        const currentPost = await Post.findById(postId);

        if (currentPost.likes.includes(userId)) {
            await currentPost.updateOne({ $pull: { likes: userId } });
        } else {
            await currentPost.updateOne({ $push: { likes: userId } });
        }

    } catch (err) {
        throw new Error(err.message);
    }
}

async function commentPost(userId, postId, comment) {
    try {
        const ownerProps = await User.findById(userId).select(['_id', 'username', 'profilePicture']);

        comment['comment'] = comment['comment'].trim();
        comment['owner'] = ownerProps;

        const currentPost = await Post.findById(postId);

        await currentPost.updateOne({ $push: { comments: comment } });

        return comment;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getPostComments(postId) {
    try {
        const data = await Post.findById(postId).select('comments');

        return data.comments;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getPostLikes(postId) {
    try {
        const data =
            await Post.findById(postId)
                .select('likes')
                .populate({ path: 'likes', select: ['username', 'profilePicture', '_id'], model: User });

        return data.likes;
    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports = {
    createPost,
    getPostById,
    editPostById,
    deletePostById,
    getFirstTenPosts,
    getAllPostFromCurrentUser,
    getNewsFeedPosts,
    likeUnlikePost,
    commentPost,
    getPostComments,
    getPostLikes
}