const path = require('path');

const getLogin = (req, res, next) => {
    const {isLogined} = req.cookies;
    if (isLogined) {
        res.status(301).cookie('isLogined', false, {maxAge: 0})
        res.redirect(path.resolve(__dirname, '/'));
    } else {
        res.render('login', {docTitle: '로그인', pagePath: '/login', lang: req.currentLanguage});
    }

}

const getGoLogin = (req, res, next) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    if (userName === 'ted' && userPassword === 'jin') {
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
}
module.exports = {
    getLogin,
    getGoLogin
}