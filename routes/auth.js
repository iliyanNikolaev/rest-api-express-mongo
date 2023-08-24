const { register } = require('../services/authService');

const authRouter = require('express').Router();

authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (username == undefined || password == undefined) {
        return res.status(403).json({ message: 'You must to provide username and password in request body!' });
    }
    if (username == '' || username.length < 3 || username.length > 20) {
        return res.status(403).json({ message: 'Username must be between 3 and 20 characters!' });
    }
    if (password == '' || password.length < 6 || password.length > 30) {
        return res.status(403).json({ message: 'Password must be between 6 and 30 characters!' });
    }

    try {
        const userData = await register(username, password);

        res.status(200).json(userData); //{"_id": "...", "username": "...","accessToken": "..."}
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

module.exports = authRouter;