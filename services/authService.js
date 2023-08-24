//models
const User = require('../models/User');

//deps
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(username, password) {
    const isExist = await User.findOne({ username });

    if (isExist) {
        throw new Error('Username already exist!');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
        username,
        password: hashedPass
    });
}

async function login(username, password) {

}



module.exports = {
    register,
    login
}