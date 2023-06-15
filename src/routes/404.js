const express = require('express');
const path = require('path');
const {rootDir} = require('../utils/path');

module.exports = express.Router().use((req, res, next) => {
    res.status(404).render('404', {docTitle: 'Not Found', lang: req.currentLanguage, pagePath: ''});
})