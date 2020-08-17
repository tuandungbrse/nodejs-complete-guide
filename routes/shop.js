var express = require('express');
var router = express.Router();
var path = require('path');
var rootPath = require('../utils/path');
var products = require('../routes/admin').products;

router.get('/', (req, res, next) => {
  res.render('shop', { prods: products, pageTitle: 'My Shop', path: '/shop' });
});

module.exports = router;
