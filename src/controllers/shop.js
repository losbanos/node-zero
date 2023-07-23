const {setExpireTime} = require('../utils/cookieUtils');
const {Product} = require('../model/product');
const menu = require('../model/nav');

/**
 * For Public User Middleware
 * @param req
 * @param res
 * @param next
 */
const getIndex = (req, res, next) => {
    const visitCount = parseInt(req.cookies.views) + 1 || 1;
    Product.fetchAll(products => {
        res.cookie('views', visitCount, {expires: setExpireTime(2)})
            .render('shop/product-list', {docTitle: '메인', pagePath: '/', lang: req.currentLanguage, products: products});
    })
}

const getProductList = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {docTitle: '상품 목록', pagePath: '/product-list', products: products, lang: req.currentLanguage});
    });
}
const getCartList = (req, res, netx) => {
    res.render('shop/cart', {
        docTitle: '장바구니',
        pagePath: '/cart',
        lang: req.currentLanguage
    });
}

const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pagePath: '/checkout', docTitle: '결제확인', lang: req.currentLanguage});
}

const addToCart = (req, res, next) => {

}

const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pagePath: '/oders',
        docTitle: '주문서',
        lang: req.currentLanguage
    })
}
module.exports = {
    getIndex,
    getProductList,
    getCartList,
    getCheckout,
    addToCart,
    getOrders
}