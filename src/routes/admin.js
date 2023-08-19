const express = require('express');
const {adminGetProducts, adminEditProduct, adminRemoveProduct, adminGetEditProduct,
    adminUpdateProduct, adminPostEditProduct, adminPostAddProduct, adminGetAddProductView
} = require('../controllers/admin');
const routerAdmin = express.Router();

routerAdmin.get('/', adminGetProducts);
routerAdmin.get('/products', adminGetProducts);
routerAdmin.get('/add-product', adminGetAddProductView);
routerAdmin.post('/add-product', adminPostAddProduct);
routerAdmin.get('/edit-product/:productId', adminGetEditProduct);
routerAdmin.post('/edit-product', adminPostEditProduct);
routerAdmin.post('remove-product', adminRemoveProduct);

module.exports = {
    routerAdmin
};