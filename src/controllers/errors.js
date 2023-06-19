const handle404 = (req, res, next) => {
    res.status(404).render('404', {docTitle: 'Not Found', lang: req.currentLanguage, pagePath: ''});
}

module.exports = {
    handle404
}