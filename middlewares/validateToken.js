//service functions
const { checkForInvalidToken, verifyToken } = require('../services/authService');

async function validateToken(req, res, next) {
    const token = req.headers['x-authorization'];

    if(token) {
        const isInvalid = await checkForInvalidToken(token);
        if(isInvalid) {
            return res.status(400).json({ error: 'Invalid access token!'});
        }

        try {
            const verifiedToken = verifyToken(token);
            req.userData = verifiedToken;
        } catch (err) {
            return res.status(400).json({ error: 'Invalid access token!' });
        }
    }

    next();
}

module.exports = validateToken;