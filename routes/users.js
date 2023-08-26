//service functions 
const { getUserById, updateUserById, deleteUserById } = require('../services/userService');

//middlewares
const isAuthenticated = require('../middlewares/isAuthenticated');

//utils
const validateProfileDetailsFormat = require('../utils/validateProfileDetailsFormat');

const userRouter = require('express').Router();

userRouter.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const currentUser = await getUserById(id); // {"_id": "...", username: user.username, "profilePicture": "...", "coverPicture": "...", "followers": [...], "following": [...]}
        res.status(200).json(currentUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

userRouter.put('/:id', isAuthenticated, async (req, res) => {
    if(req.userData._id != req.params.id) {
        return res.status(401).json({ message: 'You can edit only your profile!' });
    }

    const { username, profilePicture, coverPicture, description } = req.body;

    try {
        const validProfileDetails = validateProfileDetailsFormat(req.body);
        
        await updateUserById(req.params.id, validProfileDetails);

        res.status(202).json(validProfileDetails);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

userRouter.delete('/:id', isAuthenticated, async (req, res) => {
    if(req.userData._id != req.params.id) {
        return res.status(401).json({ message: 'You can delete only your profile!' });
    }

    try {
        await deleteUserById(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = userRouter;