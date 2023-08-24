const authRouter = require('express').Router();

authRouter.get('/', (req, res) => {
    res.json({message: 'This is auth route'});
});

module.exports = authRouter;