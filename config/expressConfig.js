const express = require('express');

function expressConfig(app) {
    app.use(express.json());
}

module.exports = expressConfig;