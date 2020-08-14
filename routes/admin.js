var express = require('express');
var router = express.Router();
var path = require('path');
var rootPath = require('../utils/path');
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootPath, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
