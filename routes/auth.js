// service functions
const { register, login, logout } = require('../services/authService');

// utils
const validateCredentialsFormat = require('../utils/validateCredentialsFormat');

const authRouter = require('express').Router();

authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const validCredentials = validateCredentialsFormat(username, password);

        const userData = await register(validCredentials.username, validCredentials.password);

        res.status(200).json(userData); // {"_id": "...", "username": "...","accessToken": "..."}
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // const validCredentials = validateCredentialsFormat(username, password);

        const userData = await login(username, password);

        res.status(200).json(userData); // {"_id": "...", "username": "...","accessToken": "..."}
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

authRouter.get('/logout', async (req, res) => {
    const token = req.headers['x-authorization'];

    if(token) {
        await logout(token);
        return res.status(202).json({ message: 'You successfully logout.'});
    }

    res.status(400).json({ error: 'You must be authenticated to send a logout request!'});
});


module.exports = authRouter;