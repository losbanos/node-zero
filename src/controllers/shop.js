const {setExpireTime} = require('../utils/cookieUtils');
const {Product} = require('../model/product');
const menu = require('../model/nav');
const Cart = require('../model/cart');
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
            .render('shop/product-list', {pageTitle: '메인', pagePath: '/', lang: req.currentLanguage, products: products});
    })
}

const getProductList = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {pageTitle: '상품 목록', pagePath: '/product-list', products: products, lang: req.currentLanguage});
    });
}

const getCartProduct = (req, res) => {
    Cart.getCartProduct(cartData => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(const product of products) {
                const cartProductData = cartData.products.find(cart => cart.id === product.id);
                if (cartProductData) {
                    cartProducts.push({...product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                pageTitle: '장바구니',
                pagePath: '/cart',
                lang: req.currentLanguage,
                products: cartProducts
            });
        })
    })
}
const getCartList = (req, res, next) => {
    req.user.getCartList()
        .then(products => {
            res.render('shop/cart', {
                pagePath: '/cart',
                pageTitle: '장바구니',
                lang: req.currentLanguage,
                products
            })
        })
        .catch(e => console.error(e));
}

const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pagePath: '/checkout', pageTitle: '결제확인', lang: req.currentLanguage});
}

const postAddToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
            return res;
        })
        .catch(e => console.error(e))

}

const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pagePath: '/oders',
        pageTitle: '주문서',
        lang: req.currentLanguage
    })
}

const getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            pagePath: '/shop/product-list',
            lang: req.currentLanguage,
            product: product
        });
    });
}

const postRemoveCartProduct = (req, res, next) => {
    const productId = req.body.productId;
    req.user.removeFromCart(productId)
        .then(result => {
            console.log('result = ', result);
            res.redirect('/cart');
        })
}


module.exports = {
    getIndex,
    getProductList,
    getCartList,
    getCheckout,
    postAddToCart,
    getOrders,
    getProductDetail,
    postRemoveCartProduct
}