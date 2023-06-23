const express = require('express');
const {getIndex, getProductList} = require('../controllers/products')
const {getGoLogin, getLogin} = require('../controllers/common')
const router = express.Router();

router.get('/', getIndex);
router.get('/product-list', getProductList);
router.get('/login', getLogin)
router.post('/gologin', getGoLogin);

module.exports = router;