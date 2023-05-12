const path = require('path');
const express = require('express');
const {rootDir} = require('../utils/path');
const {products} = require('./admin');
const {setExpireTime} = require('../utils/cookieUtils');
const router = express.Router();

router.get('/', (req, res, next) => {
    const visitCount = parseInt(req.cookies.views) + 1 || 1;
    res.cookie('views', visitCount, {expires: setExpireTime(2)}).render('shop', {docTitle: '샵', pagePath: '/'});
});
router.get('/login', (req, res, next) => {
    const {isLogined} = req.cookies;
    if (isLogined) {
        res.status(301).cookie('isLogined', false, {maxAge: 0})
        res.redirect(path.resolve(__dirname, '/'));
    } else {
        res.render('login', {docTitle: '로그인', pagePath: '/login'});
    }

})
router.post('/gologin', (req, res, next) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    if (userName === 'jin' && userPassword === 'ted') {
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