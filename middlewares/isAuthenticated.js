function isAuthenticated(req, res, next) {
    const userData = req.userData;

    if(!userData) {
        return res.status(401).json({ message: 'You are not authenticated to perform this action!'});
    }

    next();
}

module.exports = isAuthenticated;