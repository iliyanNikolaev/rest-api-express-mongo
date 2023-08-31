//models
const User = require('../models/User');

async function getUserById(id) {
    try {
        const user = await User.findById(id)
            .populate({ path: 'followers', select: [ '_id', 'username', 'profilePicture']})
            .populate({ path: 'followings', select: [ '_id', 'username', 'profilePicture']});

        return {
            _id: user._id,
            username: user.username,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture,
            followers: user.followers,
            followings: user.followings
        };
    } catch (err) {
        throw new Error('This user not exist!');
    }
}

async function updateUserById(id, userData) {
    try {
        await User.findByIdAndUpdate(id, userData);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteUserById(id) {
    try {
        await User.findByIdAndDelete(id);
    } catch (err) {
        throw new Error(err.message);
    }
}

async function followUserById(currentId, followId) {
    try {
        const currentUser = await User.findById(currentId);
        const followedUser = await User.findById(followId);

        if (currentUser.followings.includes(followedUser._id)) {
            throw new Error('You already follow this user!');
        }

        await currentUser.updateOne({ $push: { followings: followId } });
        await followedUser.updateOne({ $push: { followers: currentId } });
    } catch (err) {
        throw new Error(err.message);
    }
}

async function unfollowUserById(currentId, unfollowId) {
    try {
        const currentUser = await User.findById(currentId);
        const unfollowedUser = await User.findById(unfollowId);

        if (!currentUser.followings.includes(unfollowedUser._id)) {
            throw new Error('You don\'t follow this user!');
        }

        await currentUser.updateOne({ $pull: { followings: unfollowId } });
        await unfollowedUser.updateOne({ $pull: { followers: currentId } });

    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getUserById,
    updateUserById,
    deleteUserById,
    followUserById,
    unfollowUserById
}