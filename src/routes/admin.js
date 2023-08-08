const express = require('express');
const {adminAddProduct, adminPostProduct, adminGetProducts, adminEditProduct, adminRemoveProduct} = require('../controllers/admin');
const routerAdmin = express.Router();

routerAdmin.get('/', adminGetProducts);
routerAdmin.get('/products', adminGetProducts);
routerAdmin.get('/add-product', adminAddProduct);
routerAdmin.post('/add-product', adminPostProduct);
routerAdmin.get('/edit-product/:productId', adminEditProduct);
routerAdmin.post('remove-product', adminRemoveProduct);
module.exports = {
    routerAdmin
};