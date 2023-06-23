const path = require('path');
const {setExpireTime} = require('../utils/cookieUtils');
const {Product} = require('../model/product');
const getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product', {docTitle: '상품 등록', pagePath: '/admin/add-product', lang: req.currentLanguage});
}

const getPostProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.description);
    product.save();
    res.redirect(path.resolve(__dirname, '/'));
}

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

module.exports = {
    getIndex,
    getProductList,
    getAddProduct,
    getPostProduct
}