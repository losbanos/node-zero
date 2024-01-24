const path = require('path');
const fs = require('fs');
const Cart = require('./cart');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const {getDb} = require('../utils/database');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    });
}
class Product {
    constructor(params) {
        this.id = params.id;
        this.title = params.title;
        this.description = params.description ? params.description: '';
        this.imageUrl = params.imageUrl;
        this.price = params.price;
    }

    save() {
        const db = getDb();
        let resultProduct;
        if (this.id) {
            Product.fetchAll(products => {
                if (products.length) {
                    const existedProduct = products.find(product => product.id === this.id);
                }
            })
        } else {
            this.id = new Date().getTime().toString();
            resultProduct = db.collection('products').insertOne(this)
                .then(res => {
                    console.log('insert One result = ', res);
                    return res;
                })
                .catch(e => {
                    console.error('insert one error = ', e);
                })
        }
        return resultProduct;

    }

    static remove(productId, cb) {
        getProductsFromFile(productData => {
            const notMatchedProducts = productData.filter(product => product.id !== productId);
            const shouldRemoveProduct = productData.find(product => product.id === productId);
            fs.writeFile(p, JSON.stringify(notMatchedProducts), (err => {
                if (err) throw err;

                Cart.removeProduct(productId, shouldRemoveProduct.price);
                cb? cb(): null;
            }));
        })
    }

    static fetchAll(cb) {
        const db = getDb();
        db.collection('products').find().toArray().then(products => {
            console.log('products = ', products);
            cb(products);
            return products;
        }).catch(error => {
            console.log(error);
        })
        // getProductsFromFile(cb);
    }

    static findById(productId, cb) {
        const db = getDb();
        db.collection('products').findOne({
            id: productId
        }).then(product => {
            console.log('product findById = ', product);
            cb(product);
        }).catch(e => {
            console.error(e);
        })
    }
}

module.exports = {
    Product
}