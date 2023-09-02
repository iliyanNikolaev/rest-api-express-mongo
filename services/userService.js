//models
const User = require('../models/User');

async function getUserById(id) {
    try {
        const user = await User.findById(id)
            .populate({ path: 'followers', select: ['_id', 'username', 'profilePicture'] })
            .populate({ path: 'followings', select: ['_id', 'username', 'profilePicture'] });

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

async function getFollowingsByUserId(userId) {
    try {
        const user = await User.findById(userId)
            .populate({ path: 'followings', select: ['_id', 'username', 'profilePicture'] });


        return [...user.followings];
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

async function followUnfollowUserById(currentId, followId) {
    try {
        const currentUser = await User.findById(currentId);
        const followedUser = await User.findById(followId);

        if (currentUser.followings.includes(followedUser._id)) {
            await currentUser.updateOne({ $pull: { followings: followId } });
            await followedUser.updateOne({ $pull: { followers: currentId } });
        } else {
            await currentUser.updateOne({ $push: { followings: followId } });
            await followedUser.updateOne({ $push: { followers: currentId } });
        }

    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports = {
    getUserById,
    getFollowingsByUserId,
    updateUserById,
    deleteUserById,
    followUnfollowUserById,
}