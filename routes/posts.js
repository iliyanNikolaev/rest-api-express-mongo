//service functions
const { createPost, getPostById, editPostById, deletePostById, getAllPostFromCurrentUser, getNewsFeedPosts, likeUnlikePost, getFirstTenPosts, commentPost, getPostComments, getPostLikes } = require('../services/postService');
//middlewares
const isAuthenticated = require('../middlewares/isAuthenticated');
//utils
const validatePostFormat = require('../utils/validatePostFormat');


const postsRouter = require('express').Router();

postsRouter.get('/:id', async (req, res) => {
    try {
        const post = await getPostById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

postsRouter.post('/create', isAuthenticated, async (req, res) => {
    const data = req.body;

    try {
        const validPostData = validatePostFormat(data);

        const createdPost = await createPost({ owner: req.userData._id, ...validPostData});

        res.status(200).json(createdPost);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

postsRouter.put('/:id', isAuthenticated, async (req, res) => {
    try {
        const currentPost = await getPostById(req.params.id);

        if(req.userData._id != currentPost.owner) {
            throw new Error('You can edit only your posts!')
        }

        const data = req.body;

        const validatedPostData = validatePostFormat(data);

        await editPostById(req.params.id, validatedPostData);

        res.status(200).json(validatedPostData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

postsRouter.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const currentPost = await getPostById(req.params.id);

        if(req.userData._id != currentPost.owner) {
            throw new Error('You can delete only your posts!')
        }

        await deletePostById(req.params.id);

        return res.status(202).json({ message: 'You delete successfully this post.'})
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

postsRouter.get('/from/:id', async (req, res) => {
    try {
        const posts = await getAllPostFromCurrentUser(req.params.id);

        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ error: 'This user not exist' });
    }
});

postsRouter.get('/news/followings', isAuthenticated, async (req, res) => {
    try {
        const posts = await getNewsFeedPosts(req.userData._id);

        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

postsRouter.get('/news/guest', async (req, res) => {
    try {
        const posts = await getFirstTenPosts();

        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

postsRouter.post('/:id/like', isAuthenticated, async (req, res) => {
    try {
        await likeUnlikePost(req.userData._id, req.params.id);

        res.status(202).json({ message: 'You successfully like this post!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

postsRouter.post('/:id/comment', isAuthenticated, async (req, res) => {
    try {
        const userId = req.userData._id;
        const postId = req.params.id;
        const comment = req.body;

        const newComment = await commentPost(userId, postId, comment);

        res.status(200).json(newComment);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

postsRouter.get('/:id/comments', async (req, res) => {
    try {
        const comments = await getPostComments(req.params.id);
        
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

postsRouter.get('/:id/likes', async (req, res) => {
    try {
        const likes = await getPostLikes(req.params.id);
        
        res.status(200).json(likes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = postsRouter;

