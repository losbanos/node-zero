const Menu = require('../model/nav');
const {User} = require('../model/user');

module.exports = function(req, res, next) {
    req.currentLanguage = req.acceptsLanguages()[0];
    User.findById('65c5e79b9f4e794101cfc52f')
        .then(result => {
            req.user = new User({
                userName: result.userName,
                userId: result.userId,
                userEmail: result.userEmail,
                _id: result._id,
                regDate: result.regDate,
                cart: result.cart})
            next();
        })
        .catch(e => {
            console.error(e);
            next();
        })
    // const userName = req.cookies.userName;
    // const isLogined = req.cookies.isLogined;
    // new Menu({userName, isLogined});
    // req.menus = Menu;
    //     next();
}