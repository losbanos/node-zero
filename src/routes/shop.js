const express = require('express');
const {getIndex, getProductList, getCartList, getCheckout, addToCart, getOrders, getProductDetail,
    postRemoveCartProduct
} = require('../controllers/shop')
const {postogin, getLogin} = require('../controllers/common')
const {getRegisteUser, postRegisteUser, getUserList} = require('../controllers/user');
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
router.post('/gologin', postogin);
router.get('/registe-user', getRegisteUser);
router.post('/registe-user', postRegisteUser);
router.get('/user-list', getUserList);
module.exports = router;