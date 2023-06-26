const express = require('express');
const {adminAddProduct, adminPostProduct, adminGetProducts} = require('../controllers/admin');
const routerAdmin = express.Router();


routerAdmin.get('/add-product', adminAddProduct);
routerAdmin.post('/add-product', adminPostProduct);
routerAdmin.get('/products', adminGetProducts)
module.exports = {
    routerAdmin
};