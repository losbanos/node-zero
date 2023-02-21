const express = require('express');
module.exports = express.Router().use((req, res, next) => {
    res.status(404);
    res.send('<h1>Page Not Found</h1>');
})