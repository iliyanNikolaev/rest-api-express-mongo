const express = require('express');
const cors = require('../middlewares/cors');

function expressConfig(app) {
    app.use(express.json());
    app.use(cors);
}

module.exports = expressConfig;