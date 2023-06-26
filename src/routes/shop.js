const express = require('express');
const {getIndex, getProductList, getCartList, getCheckout} = require('../controllers/shop')
const {getGoLogin, getLogin} = require('../controllers/common')
const router = express.Router();

router.get('/', getIndex);
router.get('/product-list', getProductList);
router.get('/cart', getCartList);
router.get('/checkout', getCheckout);
router.get('/login', getLogin)
router.post('/gologin', getGoLogin);
module.exports = router;