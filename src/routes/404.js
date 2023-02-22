const express = require('express');
const path = require('path');
module.exports = express.Router().use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../', 'views', '404.html'));
})