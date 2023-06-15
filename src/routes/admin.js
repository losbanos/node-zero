const express = require('express');
const {getAddProduct, getPostProduct} = require('../controllers/products');
const routerAdmin = express.Router();


routerAdmin.get('/add-product', getAddProduct);

routerAdmin.post('/add-product', getPostProduct);

module.exports = {
    routerAdmin
};