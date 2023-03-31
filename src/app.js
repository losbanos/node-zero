const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {publicDir, rootDir} = require('./utils/path');
const {routerAdmin} = require('./routes/admin');
const routerShop = require('./routes/shop');
const router404 = require('./routes/404');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(rootDir, 'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static(publicDir));
app.use('/admin', routerAdmin);
app.use(routerShop);
app.use(router404);

app.listen(4000);