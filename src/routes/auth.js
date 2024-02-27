const express = require('express');
const routerAuth = express.Router();
const {getLogin, postLogin} = require('../controllers/auth');

routerAuth.get('/login', getLogin);
routerAuth.post('/login', postLogin);

module.exports = {
    routerAuth
};