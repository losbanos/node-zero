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
}
module.exports = Cart;