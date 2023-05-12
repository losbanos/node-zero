const express = require('express');
const path = require('path');
const routerAdmin = express.Router();
const {rootDir} = require('../utils/path');
const products = [];

routerAdmin.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {docTitle: '상품 등록', pagePath: '/admin/add-product'});
});

routerAdmin.post('/add-product', (req, res, next) => {
    products.push({
        title: req.body.title
    });
    res.redirect(path.resolve(__dirname, '/'));
});

module.exports = {
    routerAdmin,
    products
};

