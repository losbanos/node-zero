const express = require('express');
const {adminGetProducts,
    adminGetEditProduct,
     adminPostEditProduct,
    adminPostAddProduct,
    adminGetAddProductView,
    adminPostRemoveProduct,
    adminGetUserList,
    adminPostRemoveUser
} = require('../controllers/admin');

const routerAdmin = express.Router();
routerAdmin.get('/', adminGetProducts);
routerAdmin.get('/products', adminGetProducts);
routerAdmin.get('/add-product', adminGetAddProductView);
routerAdmin.post('/add-product', adminPostAddProduct);
routerAdmin.get('/edit-product/:productId', adminGetEditProduct);
routerAdmin.post('/edit-product', adminPostEditProduct);
routerAdmin.post('/remove-product', adminPostRemoveProduct);
routerAdmin.get('/user-list', adminGetUserList);
routerAdmin.post('/remove-user', adminPostRemoveUser);

module.exports = {
    routerAdmin
};