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
        id: null,
        title: req.body.title, 
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price
    });
    product.save().then(result => {
        res.redirect('/admin/products');
    }).catch(error => {
        console.log(error);
    })

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
                id: null,
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
            return res.redirect('/admin');
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
    const productParams = {
        id: req.body.productId,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price
    }
    const product = new Product(productParams)
    product.update(req.body.productId);
    return res.redirect('/admin/products');
}
const adminPostRemoveProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.remove(productId, () => {
        res.redirect('/admin/products');
    })
}
module.exports = {
    adminGetAddProductView,
    adminGetProducts,
    adminPostAddProduct,
    adminGetEditProduct,
    adminPostRemoveProduct,
    adminPostEditProduct
}