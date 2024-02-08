const Menu = require('../model/nav');

module.exports = function(req, res, next) {
    req.currentLanguage = req.acceptsLanguages()[0];
    // const userName = req.cookies.userName;
    // const isLogined = req.cookies.isLogined;
    // new Menu({userName, isLogined});
    // req.menus = Menu;
        next();
}