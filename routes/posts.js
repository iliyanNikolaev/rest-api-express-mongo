//service functions
const { createPost, getPostById, editPostById, deletePostById, getAllPostFromCurrentUser, likePost, unlikePost } = require('../services/postService');
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
        res.status(400).json({ message: err.message});
    }
});

postsRouter.post('/create', isAuthenticated, async (req, res) => {
    const data = req.body;

    try {
        const validPostData = validatePostFormat(data);

        const createdPost = await createPost({ owner: req.userData._id, ...validPostData});

        res.status(200).json(createdPost);
    } catch (err) {
        res.status(400).json({ message: err.message});
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
        res.status(400).json({ message: err.message });
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
        res.status(400).json({ message: err.message });
    }
});

postsRouter.get('/from/:id', async (req, res) => {
    try {
        const posts = await getAllPostFromCurrentUser(req.params.id);

        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

postsRouter.post('/:id/like', isAuthenticated, async (req, res) => {
    try {
        await likePost(req.userData._id, req.params.id);

        res.status(202).json({ message: 'You successfully like this post!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

postsRouter.post('/:id/unlike', isAuthenticated, async (req, res) => {
    try {
        await unlikePost(req.userData._id, req.params.id);

        res.status(202).json({ message: 'You successfully unlike this post!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = postsRouter;