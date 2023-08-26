const express = require('express');

//middlewares
const cors = require('../middlewares/cors');
const validateToken = require('../middlewares/validateToken');

function expressConfig(app) {
    app.use(express.json());
    app.use(cors);
    app.use(validateToken);
}

module.exports = expressConfig;