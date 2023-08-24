const userRouter = require('../routes/users');

function routesConfig(app) {
    app.use('/api/users', userRouter);
}

module.exports = routesConfig;