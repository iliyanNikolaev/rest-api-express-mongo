const userRouter = require('../routes/users');
const authRouter = require('../routes/auth');

function routesConfig(app) {
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
}

module.exports = routesConfig;