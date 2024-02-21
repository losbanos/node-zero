const express = require('express');

const {getIndex,
    getProductList,
    getCartList,
    getCheckout,
    postAddToCart,
    getOrders,
    getProductDetail,
    postRemoveCartProduct,
    postAddToOders
} = require('../controllers/shop')
const {postogin, getLogin} = require('../controllers/common')

const {getRegisteUser,
    postRegisteUser,
    getEditUser,
    postEditUser
} = require('../controllers/user');
const router = express.Router();

router.get('/', getIndex);
router.get('/product-list', getProductList);
router.get('/product-detail/:productId', getProductDetail);
router.get('/cart', getCartList);
router.post('/remove-cart-product', postRemoveCartProduct);
router.post('/add-to-cart', postAddToCart);
router.get('/orders', getOrders);
router.post('/add-to-orders', postAddToOders)
router.get('/checkout', getCheckout);
router.get('/login', getLogin)
router.post('/gologin', postogin);
router.get('/registe-user', getRegisteUser);
router.post('/registe-user', postRegisteUser);
router.get('/edit-user/:userId', getEditUser);
router.post('/edit-user', postEditUser);

module.exports = router;