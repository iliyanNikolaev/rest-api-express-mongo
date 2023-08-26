const userRouter = require('../routes/users');
const authRouter = require('../routes/auth');
const postsRouter = require('../routes/posts');

function routesConfig(app) {
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/posts', postsRouter);
}

module.exports = routesConfig;