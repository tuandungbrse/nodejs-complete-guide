var Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const photo = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title,
    price,
    description,
    photo,
    createdBy: req.user.id
  })
    .then((data) => {
      console.log(data);
      res.redirect('/admin/products');
    })
    .catch((error) => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const id = req.params.productId;
  Product.findById(id)
    // Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.photo = updatedImageUrl;
      return product.save();
    })
    .then((data) => {
      res.redirect('/admin/products');
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticateed: req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.findByIdAndRemove(id)
    .then((product) => {
      console.log(product);
      res.redirect('/admin/products');
    })
    .catch((error) => console.log(error));
};
