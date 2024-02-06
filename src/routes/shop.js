const express = require('express');
const {getIndex, getProductList, getCartList, getCheckout, addToCart, getOrders, getProductDetail,
    postRemoveCartProduct
} = require('../controllers/shop')
const {getGoLogin, getLogin} = require('../controllers/common')
const {getAddUser, postAddUser} = require('../controllers/user');
const router = express.Router();

router.get('/', getIndex);
router.get('/product-list', getProductList);
router.get('/product-detail/:productId', getProductDetail);
router.get('/cart', getCartList);
router.post('/remove-cart-product', postRemoveCartProduct);
router.post('/add-to-cart', addToCart);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);
router.get('/login', getLogin)
router.post('/gologin', getGoLogin);
router.get('/add-user', getAddUser);
router.post('/add-user', postAddUser);
module.exports = router;