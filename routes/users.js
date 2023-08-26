const userRouter = require('express').Router();

userRouter.get('/', (req, res) => {
    
    console.log(req.userData);

    res.json({message: 'This is user route'});
});

module.exports = userRouter;