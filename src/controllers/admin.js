const {Product} = require('../model/product');
const path = require('path');
/**
 * For Admin Manage Middleware
 * @param req
 * @param res
 * @param next
 */
const adminPostAddProduct = (req, res, next) => {
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
const adminGetAddProductView = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: '상품 등록',
        pagePath: '/admin/add-product',
        lang: req.currentLanguage,
        editMode: false,
        data: {
            product: {
                titie: '',
                price: '',
                imageUrl: '',
                description: ''
            },
            actionURL: '',
        }
    });
}

const adminGetEditProduct = (req, res, next) => {
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
            data: {
                actionUrl: '/admin/edit-product',
                product: product
            }
        })
    });
}

const adminPostEditProduct = (req, res, next) => {
    return res.redirect('/');
}
const adminRemoveProduct = (req, res, next) => {

}
module.exports = {
    adminGetAddProductView,
    adminGetProducts,
    adminPostAddProduct,
    adminGetEditProduct,
    adminRemoveProduct,
    adminPostEditProduct
}