const path = require('path');
const fs = require('fs');
const Cart = require('./cart');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const {getDb} = require('../utils/database');
const mongodb = require('mongodb');
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
        const db = getDb().collection('products');
        let result;
        if (!this.id) {
            return result = db.insertOne(this).then(res => {
                console.log('save and update => result');
                return res;
            }).catch(e => {
                console.error(e);
            })
        }
        else {
            return result = db.updateOne({_id: new mongodb.ObjectId(this.id)}, {$set: this}).then(res => {
                console.log('save and update => result');
                return res;
            }).catch(e => {
                console.error(e);
            })
        }
        // return result.then(res => {
        //     console.log('save and update => result');
        //     return res;
        // }).catch(e => {
        //     console.error(e);
        // })
    }
    update(productId) {
        getDb()
            .collection('products')
            .updateOne({_id: new mongodb.ObjectId(productId)}, {$set: this})
            .then(result => {
                console.log('update result =', result);
                return result;
            })
            .catch(e => console.error(e))
    }

    static remove(productId, cb) {
        // getProductsFromFile(productData => {
        //     const notMatchedProducts = productData.filter(product => product.id !== productId);
        //     const shouldRemoveProduct = productData.find(product => product.id === productId);
        //     fs.writeFile(p, JSON.stringify(notMatchedProducts), (err => {
        //         if (err) throw err;
        //
        //         Cart.removeProduct(productId, shouldRemoveProduct.price);
        //         cb? cb(): null;
        //     }));
        // })

        return getDb().collection('products')
            .deleteOne({_id: new mongodb.ObjectId(productId)})
            .then(result => console.log('Delete = ', result))
            .catch(err => console.error(err))
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
    }

    static findById(productId, cb) {
        const db = getDb();
        db.collection('products').find({
            _id: new mongodb.ObjectId(productId)
        }).next().then(product => {
            console.log('product findById = ', product);
            cb(product);
            return product
        }).catch(e => {
            console.error(e);
        })
    }
}

module.exports = {
    Product
}