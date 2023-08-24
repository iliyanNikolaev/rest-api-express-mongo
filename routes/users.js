const userRouter = require('express').Router();

userRouter.get('/', (req, res) => {
    res.json({message: 'This is user route'});
});

module.exports = userRouter;