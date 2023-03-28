const path = require('path');
const express = require('express');
const {rootDir} = require('../utils/path');
const {products} = require('./admin');
const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('from shop = ', products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop');
});
router.get('/login', (req, res, next) => {
    res.render('login');
})
router.post('/gologin', (req, res, next) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword
    if (userName === 'tedjin' && userPassword === 'tedjinS30%^') {
        res.status(200).send({
            message: 'Login Success'
        })
    } else {
        res.status(402).send({
            message: 'Login Fail'
        })
    }
});

module.exports = router;