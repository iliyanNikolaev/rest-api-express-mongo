//models
const User = require('../models/User');
const InvalidToken = require('../models/InvalidToken');

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
    followers: [], followings: [], createdAt: ..., updatedAt: ...}*/
        
    return {
        _id: user._id,
        username: user.username,
        accessToken: createToken(user),
        profilePicture: user.profilePicture
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
        accessToken: createToken(user),
        profilePicture: user.profilePicture
    }
}

async function logout(token) {
    const isTokenExistInBase = await checkForInvalidToken(token);

    if(!isTokenExistInBase) {
        
        await InvalidToken.create({
            token,
            createdAt: new Date()
        });
    }
}

function createToken(user) {
    const payload = {
        username: user.username,
        _id: user._id,
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
}

async function checkForInvalidToken(token) {
    const tokensFromBase = await InvalidToken.find({});

    for (const tokenInBase of tokensFromBase) {
        if(tokenInBase.token == token) {
            return true;
        }
    }

    return false;
}

function verifyToken(token) {
    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        return verifiedToken; // {username: '...', _id: '...'}
    } catch (err) {
        throw err;
    }
}


module.exports = {
    register,
    login,
    logout,
    checkForInvalidToken, 
    verifyToken
}