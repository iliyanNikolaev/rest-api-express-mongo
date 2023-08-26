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
        
        if(!currentUser.following.includes(followedUser._id)){
            await currentUser.updateOne({ $push: { following: followId }});
            await followedUser.updateOne({ $push: { followers: currentId }});
        } else {
            throw new Error('You already follow this user!');
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

async function unfollowUserById(currentId, unfollowId) {
    try {
        const currentUser = await User.findById(currentId);
        const unfollowedUser = await User.findById(unfollowId);
        
        if(currentUser.following.includes(unfollowedUser._id)){
            await currentUser.updateOne({ $pull: { following: unfollowId }});
            await unfollowedUser.updateOne({ $pull: { followers: currentId }});
        } else {
            throw new Error('You don\'t follow this user!');
        }
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