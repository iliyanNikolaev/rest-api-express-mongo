//service functions 
const { getAllUsers, getUserById, updateUserById, deleteUserById, followUnfollowUserById } = require('../services/userService');

//middlewares
const isAuthenticated = require('../middlewares/isAuthenticated');

//utils
const validateProfileDetailsFormat = require('../utils/validateProfileDetailsFormat');

const userRouter = require('express').Router();

//get user details
userRouter.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const currentUser = await getUserById(id); // {"_id": "...", username: user.username, "profilePicture": "...", "coverPicture": "...", "followers": [...], "following": [...]}
        res.status(200).json(currentUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

userRouter.get('/all/inapp', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})



//edit user
userRouter.put('/:id', isAuthenticated, async (req, res) => {
    if (req.userData._id != req.params.id) {
        return res.status(400).json({ error: 'You can edit only your profile!' });
    }

    try {
        const validProfileDetails = validateProfileDetailsFormat(req.body);

        await updateUserById(req.params.id, validProfileDetails);

        res.status(200).json(validProfileDetails);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//delete user
userRouter.delete('/:id', isAuthenticated, async (req, res) => {
    if (req.userData._id != req.params.id) {
        return res.status(400).json({ error: 'You can delete only your profile!' });
    }

    try {
        await deleteUserById(req.params.id);

        res.status(202).json({ message: 'You delete successfully this user.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//follow user
userRouter.post('/:id/follow', isAuthenticated, async (req, res) => {
    if (req.userData._id == req.params.id) {
        return res.status(400).json({ error: 'You can\'t follow yourself!' })
    }

    try {
        await followUnfollowUserById(req.userData._id, req.params.id);

        res.status(202).json({ message: 'Success!' })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = userRouter;