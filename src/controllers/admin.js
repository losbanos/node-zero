const {Product} = require('../model/product');
const path = require('path');
/**
 * For Admin Manage Middleware
 * @param req
 * @param res
 * @param next
 */
const adminPostProduct = (req, res, next) => {
    const product = new Product({
        title: req.body.title, 
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price
    });
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
    res.render('admin/edit-product', {docTitle: '상품 등록', pagePath: '/admin/add-product', lang: req.currentLanguage});
}

const adminEditProduct = (req, res, next) => {
    const editMode = req.query.editMode === 'true'

    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId;
    Product.findById(productId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            docTitle: `${product.title} 상품 수정`,
            pagePath: '/admin/edit-product',
            lang: req.currentLanguage,
            editMode: editMode,
            product: product
        })
    });
}

const adminRemoveProduct = (req, res, next) => {

}
module.exports = {
    adminAddProduct,
    adminGetProducts,
    adminPostProduct,
    adminEditProduct,
    adminRemoveProduct
}