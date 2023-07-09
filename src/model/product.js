const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
console.log('p = ', p);
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
    constructor(title, description) {
        this.title = title;
        this.description = description ? description: '';
    }

    save() {
        getProductsFromFile(productsData => {
            productsData.push(this);
            fs.writeFile(p, JSON.stringify(productsData), err => {
                console.log('error write = ', err);
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}

module.exports = {
    Product
}