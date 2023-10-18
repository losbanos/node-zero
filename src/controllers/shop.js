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
            .render('shop/product-list', {docTitle: '메인', pagePath: '/', lang: req.currentLanguage, products: products});
    })
}

const getProductList = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {docTitle: '상품 목록', pagePath: '/product-list', products: products, lang: req.currentLanguage});
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
                docTitle: '장바구니',
                pagePath: '/cart',
                lang: req.currentLanguage,
                products: cartProducts
            });
        })
    })
}
const getCartList = (req, res, next) => {
    getCartProduct(req, res)
}

const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pagePath: '/checkout', docTitle: '결제확인', lang: req.currentLanguage});
}

const addToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProductToCart(productId, product.price);
    });
    res.redirect('/cart');
}

const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pagePath: '/oders',
        docTitle: '주문서',
        lang: req.currentLanguage
    })
}

const getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('shop/product-detail', {
            docTitle: product.title,
            pagePath: '/shop/product-list',
            lang: req.currentLanguage,
            product: product
        });
    });
}

const postRemoveCartProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        console.log('product = ', product);
        Cart.removeProduct(productId, product.price, () => {
            getCartProduct(req, res);
        });
    })
}


module.exports = {
    getIndex,
    getProductList,
    getCartList,
    getCheckout,
    addToCart,
    getOrders,
    getProductDetail,
    postRemoveCartProduct
}