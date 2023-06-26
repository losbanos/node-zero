/**
 * For Admin Manage Middleware
 * @param req
 * @param res
 * @param next
 */
const adminPostProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.description);
    product.save();
    res.redirect(path.resolve(__dirname, '/'));
}
const adminGetProducts = (req, res, next) => {

}
const adminAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product', {docTitle: '상품 등록', pagePath: '/admin/add-product', lang: req.currentLanguage});
}

module.exports = {
    adminAddProduct,
    adminGetProducts,
    adminPostProduct
}