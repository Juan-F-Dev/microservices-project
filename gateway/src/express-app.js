const express = require('express');
const cors = require('cors');
const proxyRoutes = require('./routes');

module.exports = async (app) => {
    app.use(cors());
    app.use(express.json());
    proxyRoutes(app);
};
