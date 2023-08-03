const path = require('path');
const fs = require('fs');

const cartDataPath = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

class Cart {
    static addProductToCart(id, price) {
        let cart = {products: [], totalPrice: 0};
        fs.readFile(cartDataPath, (err, fileContent) => {
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const existedProductIndex = cart.products.findIndex(product => product.id === id);
            const existedProduct = cart.products.find(product => product.id === id);
            let updatedProduct;
            
            if (existedProduct) {
                updatedProduct = {...existedProduct}
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products.splice(existedProductIndex, 1, updatedProduct);
            } else {
                cart.products = [...cart.products, {qty: 1, id: id}];
            }

            cart.totalPrice = cart.totalPrice + Number(price);
            fs.writeFile(cartDataPath, JSON.stringify(cart), (err) => {
                if (!err) {
                    console.log('write error = ', err);
                    console.log('write File OK');
                }
            });
        })
    }
}

module.exports = Cart;