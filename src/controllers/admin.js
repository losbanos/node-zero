const {Product} = require('../model/product');
const path = require('path');
const {User} = require('../model/user');
const {format} = require('date-fns');
const {ko} = require('date-fns/locale');
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
            pageTitle: '상품목록',
            lang: req.currentLanguage,
            products: products
        })
    })
}
const adminGetAddProductView = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: '상품 등록',
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
            pageTitle: `${product.title} 상품 수정`,
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
    product.save().then(result => {
        return res.redirect('/admin/products');
    })
}
const adminPostRemoveProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.remove(productId).then(result => {
        res.redirect('/admin/products');
    });
}

const adminGetUserList = (req, res, next) => {
    User.fetchAll().then(result => {
        if (result) {
            result.map(user => {
                user.regDate = format(user.regDate || new Date('2024-01-01'), 'PPPP p', {
                    locale: ko
                })
                return user;
            })
            res.render('admin/user-list', {
                users: result,
                pageTitle: '유저 목록',
                pagePath: '/admin/user-list',
                lang: req.currentLanguage
            })
        }
    });
}

const adminPostRemoveUser = (req, res, next) => {
    const userId = req.body.userId;
}
module.exports = {
    adminGetAddProductView,
    adminGetProducts,
    adminPostAddProduct,
    adminGetEditProduct,
    adminPostRemoveProduct,
    adminPostEditProduct,
    adminGetUserList,
    adminPostRemoveUser
}