const {Product} = require('../model/product');
const path = require('path');
/**
 * For Admin Manage Middleware
 * @param req
 * @param res
 * @param next
 */
const adminPostProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.description);
    product.save();
    res.redirect('/admin/products')
}
const adminGetProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            pagePath: '/admin/products',
            docTitle: '상품목록',
            lang: req.currentLanguage,
            products: products
        })
    })
}
const adminAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product', {docTitle: '상품 등록', pagePath: '/admin/add-product', lang: req.currentLanguage});
}

module.exports = {
    adminAddProduct,
    adminGetProducts,
    adminPostProduct
}