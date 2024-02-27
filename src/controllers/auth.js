const getLogin = (req, res, next) => {
    res.render('auth/login', {
        pagePath: '/login',
        pageTitle: '로그인',
        lang: req.currentLanguage
    })
}

const postLogin = (req, res, next) => {

}

module.exports = {
    getLogin,
    postLogin
}