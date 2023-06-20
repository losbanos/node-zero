const products = [];
class Product {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }
}

module.exports = {
    Product
}