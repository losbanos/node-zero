const path = require('path');
const {setExpireTime} = require('../utils/cookieUtils');
const {Product} = require('../model/product');

const getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {docTitle: '상품 등록', pagePath: '/admin/add-product', lang: req.currentLanguage});
}

const getPostProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.description);
    product.save();
    res.redirect(path.resolve(__dirname, '/'));
}

const getIndex = (req, res, next) => {
    const visitCount = parseInt(req.cookies.views) + 1 || 1;
    res.cookie('views', visitCount, {expires: setExpireTime(2)}).render('shop', {docTitle: '샵', pagePath: '/', products: Product.fetchAll(), lang: req.currentLanguage});
}


module.exports = {
    getIndex,
    getAddProduct,
    getPostProduct
}