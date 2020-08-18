var express = require('express');
var router = express.Router();
var products = require('../controllers/products');

router.get('/', products.getAllProduct);

module.exports = router;
