// service functionals
const { register, login, logout } = require('../services/authService');

// utils
const validateCredentialsFormat = require('../utils/validateCredentialsFormat');

const authRouter = require('express').Router();

authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        validateCredentialsFormat(username, password);

        const userData = await register(username.trim().toLowerCase(), password.trim());

        res.status(200).json(userData); // {"_id": "...", "username": "...","accessToken": "..."}
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        validateCredentialsFormat(username, password);

        const userData = await login(username.trim().toLowerCase(), password.trim());

        res.status(200).json(userData); // {"_id": "...", "username": "...","accessToken": "..."}
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

authRouter.get('/logout', async (req, res) => {
    const token = req.headers['x-authorization'];

    if(token) {
        await logout(token);
        return res.status(204).end();
    }

    res.status(400).json({ message: 'You must be authenticated to send a logout request!'});
});


module.exports = authRouter;