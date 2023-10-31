const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {publicDir, rootDir} = require('./utils/path');
const {routerAdmin} = require('./routes/admin');
const routerShop = require('./routes/shop');
const path = require('path');
const initData = require('./controllers/initData');
const {handle404} = require('./controllers/errors');
const {mongoConnect} = require('./utils/database');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static(publicDir));
app.use(initData);
app.use('/admin', routerAdmin);
app.use(routerShop);
app.use(handle404);

mongoConnect(client => {
    console.log(client);
    app.listen(4000);
})
