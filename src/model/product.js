const path = require('path');
const fs = require('fs');
const {re} = require('@babel/core/lib/vendor/import-meta-resolve');
const products = [];

class Product {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    save() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, data) => {
            let products = [];
            if (!err) {
                products = JSON.parse(data);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log('error write = ', err);
            })
        })
    }

    static fetchAll(cb) {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        let result = []
        fs.readFile(p, (err, data) => {
            if(err) {
                cb([]);
            } else {
                cb(JSON.parse(data));
            }
        });
        return result;
    }

    retrieveProducts() {

    }
}

module.exports = {
    Product
}