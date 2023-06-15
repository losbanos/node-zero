const express = require('express');
const {getIndex} = require('../controllers/products')
const {getGoLogin, getLogin} = require('../controllers/common')
const router = express.Router();

router.get('/', getIndex);
router.get('/login', getLogin)
router.post('/gologin', getGoLogin);

module.exports = router;