var Product = require('../models/product');

exports.getAddProduct = function getAddProduct(req, res, next) {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = function postAddProduct(req, res, next) {
  let product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getAllProduct = function getAllProduct(req, res, next) {
  Product.fetchAll((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'My Shop',
      path: '/shop',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
