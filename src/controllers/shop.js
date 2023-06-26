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
    res.cookie('views', visitCount, {expires: setExpireTime(2)})
        .render('shop/index', {docTitle: '메인', pagePath: '/', lang: req.currentLanguage});
}

const getProductList = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {docTitle: '상품 목록', pagePath: '/product-list', products: products, lang: req.currentLanguage});
    });
}
const getCartList = (req, res, netx) => {

}

const getCheckout = (req, res, next) => {

}


module.exports = {
    getIndex,
    getProductList,
    getCartList,
    getCheckout
}