//models
const User = require('../models/User');

//depends
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(username, password) {
    const isExist = await User.findOne({ username });

    if (isExist) {
        throw new Error('Username already exist!');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPass
    }); /* { _id: ..., username: '...', password: '...', profilePicture: '...', coverPicture: '', 
    followers: [], following: [], isAdmin: ..., createdAt: ..., updatedAt: ...}*/
        
    return {
        _id: user._id,
        username: user.username,
        accessToken: createToken(user)
    }
}

async function login(username, password) {
    const user = await User.findOne({ username });

    if(!user) {
        throw new Error('Incorrect username or password!');
    }

    const comparing = await bcrypt.compare(password, user.password);

    if(!comparing) {
        throw new Error('Incorect username or password!');
    }

    return {
        _id: user._id,
        username: user.username,
        accessToken: createToken(user)
    }
}

function createToken(user) {
    const payload = {
        username: user.username,
        _id: user._id
    }

    return jwt.sign(payload, process.env.JWT_SECRET);
}



module.exports = {
    register,
    login
}