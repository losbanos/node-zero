const express = require('express');
const path = require('path');
const {rootDir} = require('../utils/path');
const {handle404}  = require('../controllers/errors');

module.exports = express.Router().use(handle404);