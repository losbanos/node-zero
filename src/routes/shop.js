const path = require('path');
const express = require('express');
const {rootDir} = require('../utils/path');
const {products} = require('./admin');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('shop');
});
router.get('/login', (req, res, next) => {
    const {isLogined} = req.cookies;
    if (isLogined) {
        res.status(301).cookie('isLogined', false, {maxAge: 0})
        res.redirect(path.resolve(__dirname, '/'));
    } else {
        res.render('login');
    }

})
router.post('/gologin', (req, res, next) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword
    const date = new Date();
    date.setDate(date.getDate() + (24 * 60 * 60 * 1000));
    if (userName === '1' && userPassword === '2') {
        res.status(200).cookie('isLogined', true, {expires: date}).send({
            message: 'Login Success',
            value: {
                isLogined: true
            }
        })

    } else {
        res.status(401).cookie(
            'isLogined', false
        ).send({
            message: 'Login Fail'
        })
    }
});

module.exports = router;