//models
const User = require('../models/User');

async function getUserById(id) {
    try {
        const user = await User.findById(id);

        return {
            _id: user._id,
            username: user.username,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture,
            followers: user.followers,
            following: user.following
        };
    } catch (err) {
        throw new Error('This user not exist!');
    }
}

async function updateUserById(id, userData) {
    try {
        await User.findByIdAndUpdate(id, {
            ...userData
        });   
    } catch (err) {
        throw new Error('Error in db!');
    }
}

async function deleteUserById(id) {
    try {
        await User.findByIdAndDelete(id);
    } catch (err) {
        throw new Error('Error in db!');
    }
}

module.exports = {
    getUserById,
    updateUserById,
    deleteUserById
}