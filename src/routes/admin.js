const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send('<form action="add-product" method="POST"><input type="text" name="title" /><button type="submit" value="Enter">Enter Product Name</button></form>');
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body.title);
    res.redirect('/');
});

module.exports = router;
