const express = require('express');
const {adminAddProduct, adminPostProduct, adminGetProducts} = require('../controllers/admin');
const routerAdmin = express.Router();

routerAdmin.get('/', adminGetProducts);
routerAdmin.get('/products', adminGetProducts);
routerAdmin.get('/add-product', adminAddProduct);
routerAdmin.post('/add-product', adminPostProduct);
module.exports = {
    routerAdmin
};