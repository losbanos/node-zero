const {User} = require('../model/user');
const getUserList = (res, req, next) => {

}
const getRegisteUser = (req, res, next) => {
    res.render('shop/registe-user', {
        pagePath: '/retiste-user',
        pageTitle: '가입하기',
        lang: req.currentLanguage
    })
}

const postRegisteUser = (req, res, next) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const user = new User({
        userName,
        userEmail
    });
    user.save()
        .then(result => {
            console.log('user register success')
            res.render('shop/welcome-registe', {
                pagePath: '/welcome-registe',
                pageTitle: '가입 완료',
                lang: req.currentLanguage,
                user
            })
        })
        .catch(e => console.error(e))
}


module.exports = {
    getRegisteUser,
    postRegisteUser,
    getUserList
}