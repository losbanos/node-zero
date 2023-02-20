const express = require('express');
const bodyParser = require('body-parser');
const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(routerAdmin);
app.use(routerShop);

app.listen(4000);