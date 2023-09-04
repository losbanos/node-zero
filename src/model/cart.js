const fs = require('fs');
const path = require('path');
const cartFilePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
)
class Cart {
    static addProductToCart(id, price) {
        let cart = {products: [], totalPrice: 0};
        fs.readFile(cartFilePath, (err, cartData) => {
            if (!err) {
                cart = JSON.parse(cartData);
            }

            const productIndex = cart.products.findIndex(product => product.id === id);
            const existedProduct = cart.products.find(product => product.id === id)
            let updatedProduct;

            if (existedProduct) {
                updatedProduct = {...existedProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products.splice(productIndex, 1, updatedProduct);
            } else {
                cart.products = [...cart.products, {qty: 1, id: id}];
            }

            cart.totalPrice = cart.totalPrice + Number(price);
            fs.writeFile(cartFilePath, JSON.stringify(cart), err => {
                console.log('err = ', err);
            })
        });

    }

    static removeProduct(id, price) {
        fs.readFile(cartFilePath, (err, cartData) => {
            if (err) {
                return;
            }
            const updatedProduct = {...JSON.parse(cartData)};
            const shouldRemoveProduct = updatedProduct.products.find(product => product.id === id);
            const shouldRemoveProductQty = shouldRemoveProduct.qty;
            updatedProduct.totalPrice = updatedProduct.totalPrice - (price * shouldRemoveProductQty);
            updatedProduct.products = updatedProduct.products.filter(product => product.id !== id);

            fs.writeFile(cartFilePath, JSON.stringify(updatedProduct), err => {
                if (err) {
                    console.log(err);
                }
            })

        })
    }

    static getCartProduct(cb) {
        fs.readFile(cartFilePath, (err, cartData) => {
            if (!err) {
                const productData = JSON.parse(cartData);
                cb(productData);
            } else {
                cb(null);
            }
        });
    }
}
module.exports = Cart;