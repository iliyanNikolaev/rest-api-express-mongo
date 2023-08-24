const express = require('express');

const connectToDB = require('./config/connectToDB');
const expressConfig = require('./config/expressConfig');
const routesConfig = require('./config/routesConfig');

start();

async function start() {
    await connectToDB();

    const app = express();
    
    expressConfig(app);
    routesConfig(app);
    app.listen(3001, () => console.log('server listenning on port 3001'));
} 