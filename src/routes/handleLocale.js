module.exports = function(req, res, next) {
    req.currentLanguage = req.acceptsLanguages()[0];
    next();
}