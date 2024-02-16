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
            res.render('shop/welcome-registe', {
                pagePath: '/welcome-registe',
                pageTitle: '가입 완료',
                lang: req.currentLanguage,
                user
            })
        })
        .catch(e => console.error(e))
}

const getEditUser = (req, res, next) => {
    const userId = req.params.userId;
    const editMode = req.query.editMode === 'true';
    if (!editMode) {
        res.redirect('/');
    } else {
        User.findById(userId).then( result => {
            res.render('edit-user', {
                pageTitle: '유저 정보 수정',
                pagePath: '/edit-user',
                lang: req.currentLanguage,
                user: result
            })
        })
    }
}

const postEditUser = (req, res, next) => {

}

module.exports = {
    getRegisteUser,
    postRegisteUser,
    getUserList,
    getEditUser,
    postEditUser
}