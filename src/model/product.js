const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
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
        getProductsFromFile(productsData => {
            if (this.id) {
                const existedProductIndex = productsData.findIndex(product => product.id === this.id);
                productsData.splice(existedProductIndex, 1, this);
            } else {
                this.id = new Date().getTime().toString();
                productsData.push(this);
            }
            fs.writeFile(p, JSON.stringify(productsData), err => {
                console.log('error write = ', err);
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(productId, cb) {
        getProductsFromFile(products => {
            const product = products.find(({id}) => id === productId);
            product ? cb(product): null;
        })
    }
}

module.exports = {
    Product
}