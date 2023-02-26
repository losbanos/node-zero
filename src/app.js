const express = require('express');
const bodyParser = require('body-parser');
const {publicDir} = require('./utils/path');
const {routerAdmin} = require('./routes/admin');
const routerShop = require('./routes/shop');
const router404 = require('./routes/404');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(publicDir));
app.use('/admin', routerAdmin);
app.use(routerShop);
app.use(router404);

app.listen(4000);